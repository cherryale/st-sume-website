/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from 'sanity'
import type { StructureResolver } from 'sanity/structure'

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'settings',
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type)
        }

        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      }
    }
  }
})

// The StructureResolver is how we're changing the DeskTool structure to linking to a single "Settings" document, instead of rendering "settings" in a list
// like how "Post" and "Author" is handled.
export const settingsStructure = (
  typeDef: DocumentDefinition
): StructureResolver => {
  return (S) => {
    // The `Settings` root list item
    const settingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
      S.listItem()
        .title(typeDef?.title || 'Settings')
        .icon(() => '⚙️')
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
        )

    // Menu singleton
    const menuListItem = S.listItem()
      .title('Menu')
      .icon(() => '📋')
      .child(S.editor().id('menu').schemaType('menu').documentId('menu'))

    // Homepage singleton
    const homepageListItem = S.listItem()
      .title('Homepage')
      .icon(() => '🏠')
      .child(
        S.editor().id('homepage').schemaType('homepage').documentId('homepage')
      )

    const blogListItem = S.listItem()
      .id('blogPage')
      .title('Blog')
      .icon(() => '🖊️')
      .child(
        S.editor().id('blogPage').schemaType('blogPage').documentId('blogPage')
      )

    const researchListItem = S.listItem()
      .id('research')
      .title('Research')
      .icon(() => '🔍')
      .child(
        S.editor().id('research').schemaType('research').documentId('research')
      )

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        listItem.getId() !== typeDef.name &&
        listItem.getId() !== 'homepage' &&
        listItem.getId() !== 'menu' &&
        listItem.getId() !== 'blogPage' &&
        listItem.getId() !== 'research'
    )

    return S.list()
      .title('Content')
      .items([
        settingsListItem,
        menuListItem,
        homepageListItem,
        researchListItem,
        blogListItem,
        S.divider(),
        ...defaultListItems
      ])
  }
}
