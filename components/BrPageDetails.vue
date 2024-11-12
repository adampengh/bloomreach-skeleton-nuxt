<template :v-if="page">
  <section class="container flex-fill pt-3" :v-if="accordionItems">
    <UAccordion :items="accordionItems" :ui="{
      item: {
        base: 'bg-white border-2',
        color: 'text-black',
        padding: 'p-2'
      }
    }">
      <template #default="{ item, open }">
        <UButton color="gray" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
          <template #leading>
            <div class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1">
              <UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
            </div>
          </template>
          <span class="truncate">{{ item.label }}</span>
          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-left-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200"
              :class="[open && '-rotate-90']"
            />
          </template>
        </UButton>
      </template>

      <template #context>
        <div class="bg-white">
          <h2 class="text-lg">API Endpoint: {{ endpoint.replace(/\?.*/g, '') }}</h2>
          <h2 class="text-lg">Channel: {{ channel }}</h2>
          <h2 class="text-lg">Branch: {{page.model.meta.branch}}</h2>
          <h2 class="text-lg">Preview: {{ preview }}</h2>
        </div>
      </template>

      <template #page>
        <h1>Page</h1>
        <div>
          <vue-json-pretty
            :data="page.toJSON()"
            :showLine=true
            :showIcon=true
            :collapsedNodeLength=10
          />
        </div>
      </template>

      <template #menus>
        <div :v-if="menus">
          <UCard v-for="(menu, index) in menus" :key="index" :ui="{
            rounded: '',
            shadow: '',
            body: {
              padding: 'p-3'
            }
          }">
            <div class="relative" :v-if="menu">
              <br-manage-menu-button :menu="menu" />
              <h2 class="text-xl capitalize">{{ menu.getName() }}</h2>
            </div>
          </UCard>
        </div>
      </template>
    </UAccordion>
  </section>
</template>

<script setup lang="ts">
import type { Menu, Page, Component } from '@bloomreach/spa-sdk';
import { isComponent, isMenu } from '@bloomreach/spa-sdk';
// import VueJsonPretty from 'vue-json-pretty'

const props = defineProps<{
  configuration: any,
  page: Page
}>();

// Context
const preview = props.page.isPreview();
const endpoint = props.configuration.endpoint;
const channelRegex = new RegExp('(?:https:\/\/([a-z0-9]*).bloomreach.io\/delivery\/site\/v1\/channels\/([a-z\-0-9]*)\/pages)');
const channel = endpoint && endpoint.match(channelRegex) ? endpoint.match(channelRegex)[2] : '';

// Page
const page = props.page;

// Menus
const hasChildren = (component: Component) => {
  return component.getChildren()?.length > 0;
}

const getComponents = (component: Component) => {
  return component.getChildren();
}

const getModels = (component: Component) => {
  return component.getModels();
}

const getMenus = (page: Page) => {
  let menus: any = [];
  const components = page.getComponent().getChildren();
  components.forEach((component: Component) => {
    if (isComponent(component)) {
      const containerComponents = getComponents(component);
      containerComponents.forEach((containerComponent: Component) => {
        const models = containerComponent.getModels();
        if (models) {
          Object.entries(models).forEach(([key, value]) => {
            if (value) {
              const content = page.getContent<Menu>(value);
              if (isMenu(content)) {
                menus.push(content);
              }
            }
          })
        }
      })
    }
  })
  return menus;
}

const menus = getMenus(page);
console.log('menus', menus)
// const menus: Menu[] = Object.values(props.page.model.page).filter((component: Component) => component.type === 'menu');
// menus.forEach((menu: Menu, index: number) => {
//   console.log('menu', menu)
// });

const accordionItems = [{
  label: 'Context',
  icon: 'i-heroicons-information-circle',
  slot: 'context',
}, {
  label: 'Page',
  icon: 'i-heroicons-document',
  slot: 'page',
}, {
  label: 'Menus',
  icon: 'i-heroicons-list-bullet',
  slot: 'menus',
  defaultOpen: true,
}];

</script>