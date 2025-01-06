---
date: 2022-11-28
tags:
  - elixir
  - publish
---

### Talks
* [Taking Elixir to the Metal with Rust - Sonny Scroggin](https://www.youtube.com/watch?v=lSLTwWqTbKQ)
- [Don t write NIFs (at least not in C) - Sonny Scroggin](https://www.youtube.com/watch?v=BREqrlzfQUo) (New)
---
Elixir and the Outside World
- Ports
- erl_interface
- C Nodes
- Port Drivers
- Native Implemented Functions (NIFs)

---
### NIFs
- Called just like any other Erlang/Elixir code
- NIFs live in a dynamically loaded library (.so or .dll)
- NIFs replace Erlang/Elixir functions of the same name/arity at module load time
---

**Functionality**
- Read and write Erlang terms
- Binaries
- Resource objects
- Threads and concurrency
---

Example
```erlang
defmodule Json do
	@on_load :init
	def init do
		dylib = :code.priv_dir(:fast_json) ++ '/libfast_json'
		:erlang.load_nif(dylib, 0)
	end

	def encode(_data), do: :erlang.nif_error(:nif_not_loaded)
	
	def decode(_data), do: :erlang.nif_error(:nif_not_loaded)
end
```

---
**Resource Objects**
- Resource objects are a safe way to return pointers to native data structures from a NIF
- It can be stored and passed between processes on the same node
- the only real end usage is to pass it back as an argument to a NIF
- A resource object is not deallocated until the last handle term is garbage collected by the VM
---
**Rescheduling**
* The Erlang NIF API provides a way for a NIF to reschedule itself directly with `enif_schedule_nif`
* When combined with `rustler::schedule::consume_timeslice` it allows all the chunking to be done directly in the NIF (No supported yet)
---

Threaded NIFs
* Spawn a separate OS thread to do the work
* Send the result as a message to the calling process
---
Dirty NIFs
* Allows you to call a NIF without worrying about blocking a normal scheduler
* By default you will have the same number of dirty schedulers as normal schedulers

[[Elixir]] with [[Rust]]
#rust
[rustler](https://github.com/rusterlium/rustler)
```rust
#[rustler::nif(schedule = "DirtyCpu" | "DirtyIo")]
pub fn dirty_cpu() -> Atom {
	let duration = Duration::from_millis(100);

	std::thread::sleep(duration);

	atoms::ok()
}
```

serde_rustler
JSON Example
```rust
use serde_bytes::Bytes;
use serde_rustler::{from_term, to_term, Deserializer, Serializer};
use serde_transcode::transcode;

/// Deserializes a JSON string into an Elixir term.
pub fn decode<'a>(env: Env<'a>, args: &[Term<'a>]) -> NifResult<Term<'a>> {
    let json_bytes: &[u8] = from_term(args[0])?;
    let mut de = serde_json::Deserializer::from_slice(json_bytes);
    let ser = Serializer::from(env);

    transcode(&mut de, ser).map_err(|err| err.into())
}

/// Serializes an Elixir term into a compact JSON string.
pub fn encode_compact<'a>(env: Env<'a>, args: &[Term<'a>]) -> NifResult<Term<'a>> {
    let de = Deserializer::from(args[0]);
    let mut ser_vec = Vec::new();
    let mut ser = serde_json::Serializer::new(&mut ser_vec);
    transcode(de, &mut ser).or(Err(NifError::RaiseAtom("transcode error")))?;

    to_term(env, Bytes::new(&ser_vec)).map_err(|err| err.into())
}
```