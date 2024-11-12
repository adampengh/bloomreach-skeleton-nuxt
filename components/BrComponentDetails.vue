<!--
  Copyright 2024 Bloomreach

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  -->

<template>
  <div class="mb-3">
    <UCard
      :ui="{
        base: 'border-2',
        background: 'bg-white dark:bg-gray-900',
        divide: 'divide-slate-300 dark:divide-slate-200',
        ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
        rounded: '',
        shadow: 'shadow',
        header: {
          base: '',
          background: '',
          padding: 'p-2'
        },
        body: {
          base: '',
          background: '',
          padding: 'p-0'
        },
        footer: {
          base: '',
          background: '',
          padding: 'p-2'
        }
      }"
    >
      <template #header>
        <h1 class="text-xl font-bold">{{ title }}</h1>
        <p>{{ props.component.getName() }}</p>
      </template>
      <UTabs
        orientation="vertical"
        :items="items"
        :ui="{
          wrapper: 'flex gap-4',
          list: {
            base: 'relative bg-white border-r-2 border-slate-100 dark:border-slate-200',
            padding: '',
            rounded: '',
            width: 'w-48 align-left',
            marker: {
              rounded: '',
              background: 'bg-blue-100 dark:bg-blue-100 border-r-4 border-blue-400',
            },
            tab: {
              base: 'relative inline-flex justify-start flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out',
              active: 'text-blue-900 dark:text-bg-gray-400 bg-blue-100 dark:bg-blue-100 border-r-4 border-blue-400',
              inactive: 'text-gray-900 dark:text-black bg-white border-r-4 border-slate-100',
              height: 'h-12',
              padding: 'p-2',
              rounded: '',
              size: 'text-md'
            }
          },
        }"
      >
        <template #item="{ item }">
          <h1>{{item.label}}</h1>
        </template>

        <template #component>
          <div :v-if="componentData">
            <h1>Component</h1>
            <vue-json-pretty
              :data="componentData"
              :showLine=true
              :showLineNumber=true
              :showIcon=true
              :collapsedNodeLength=10
              :deep=1
            />
          </div>
        </template>
      </UTabs>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
  import type { Component, ContainerItem, Document, ImageSet, Page } from '@bloomreach/spa-sdk';
  import { getContainerItemContent } from '@bloomreach/spa-sdk';
  import { BrComponent } from '@bloomreach/vue-sdk';
  import VueJsonPretty from 'vue-json-pretty'

  const props = defineProps<{
    component: ContainerItem,
    page: Page
  }>();

  const component = props.component;
  const page = props.page;

  const title = computed(() => component.getLabel());
  const componentData = computed(() => JSON.parse(JSON.stringify(props.component)));

  // const documentRef = computed(() => props.component.getModels<DocumentModels>().document);
  // const document = computed(() => documentRef.value && props.page.getContent<Document>(documentRef.value));
  // const data = computed(() => document.value?.getData<DocumentData>());
  // const image = computed(() => data.value?.image && props.page.getContent<ImageSet>(data.value?.image));
  // const link = computed(() => data.value?.link && props.page.getContent<Document>(data.value?.link));
  // const isPreview = computed(() => props.page.isPreview());
  // const html = ref<string | null>();
  // watch(documentRef, () => {
  //   if (data.value?.content) {
  //     html.value = props.page.rewriteLinks(sanitize(data.value.content.value));
  //   }
  // }, { immediate: true });

  // Content
  const content = getContainerItemContent(component, page) ?? undefined
  const models = component.getModels();
  console.log('models', models)
  Object.entries(models).forEach(([key, value]) => {
    console.log(key, value)
  })


  const items = [
  {
    label: 'CONTENT',
    content: 'And, this is the content for Tab2',
    slot: 'content',
  },
  {
    label: 'COMPONENT',
    content: 'This is the content shown for Tab1',
    slot: 'component',
  },
  {
    label: 'PROPERTIES',
    content: 'Finally, this is the content for Tab3',
    slot: 'properties',
  }]
</script>