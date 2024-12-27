import { registerEscapeHandler } from "../../../quartz/components/scripts/util"

function setupZoom() {
  const zoomableImages = document.querySelectorAll('img.img-zoom')

  zoomableImages.forEach(image => {
    let img = image as HTMLImageElement
    img.addEventListener('click', () => {
      // Create overlay
      const overlay = document.createElement('div')
      overlay.className = 'zoom-overlay'

      // Create zoomed image
      const zoomedImg = document.createElement('img')
      zoomedImg.src = (img as HTMLImageElement).src
      zoomedImg.className = 'zoomed-image'

      // Add close functionality
      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay)
      })

      // Add elements to DOM
      overlay.appendChild(zoomedImg)
      document.body.appendChild(overlay)

      registerEscapeHandler(overlay, () => {
        document.body.removeChild(overlay)
      })
    })

    // Add visual indicator that image is zoomable
    img.style.cursor = 'zoom-in'
  })
}

document.addEventListener('nav', setupZoom)
window.addEventListener('DOMContentLoaded', setupZoom)