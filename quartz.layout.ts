import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";
import { notesFilter } from "./quartz-custom/utils/filter";
import { topicFilter } from "./quartz-custom/utils/filter";
import * as CustomComponent from "./quartz-custom/components";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: CustomComponent.Footer({
    links: {
      GitHub: "https://github.com/rakshans1",
      Twitter: "https://twitter.com/rakshans2",
      LinkedIn: "https://www.linkedin.com/in/rakshan-shetty",
      Instagram: "https://instagram.com/rakshans2",
      Email: "mailto:shetty.raxx555@gmail.com",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    CustomComponent.ArticleTitle(),
    CustomComponent.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({ title: "Topics", filterFn: topicFilter }),
    ),
  ],
  right: [
    Component.DesktopOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({ limit: 5, showTags: false, filter: notesFilter }),
  ],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    CustomComponent.ArticleTitle(),
    CustomComponent.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        title: "Topics",
        filterFn: topicFilter,
      }),
    ),
  ],
  right: [],
};
