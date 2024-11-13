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
            base: 'relative bg-white',
            padding: '',
            width: 'w-48 align-left border-r-2 border-slate-200',
            tab: {
              base: 'relative inline-flex justify-start flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out',
              active: 'text-blue-900 dark:text-bg-gray-400 bg-blue-100 dark:bg-blue-100 border-r-2 border-blue-400',
              inactive: 'text-gray-900 dark:text-black bg-white',
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

        <template #content>
          <div v-if="containerItemContent">
            <vue-json-pretty
              :data="containerItemContent"
              :showLine=true
              :showIcon=true
            />
          </div>
          <div v-if="document && isDocument(document)">
            <br-manage-content-button :content="document" />
            <vue-json-pretty
              :data="document.getData()"
              :showLine=true
              :showIcon=true
            />
          </div>
        </template>

        <template #component>
          <div v-if="componentData">
            <vue-json-pretty
              :data="componentData"
              :showLine=true
              :showIcon=true
            />
          </div>
        </template>

        <template #properties>
          <ul>
            <li v-for="(value, key) in props.component.getParameters()" :key="key">
              <strong>{{ key }}</strong>: {{ value }}
            </li>
          </ul>
        </template>
      </UTabs>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ContainerItem, Page } from '@bloomreach/spa-sdk';
  import { getContainerItemContent, isDocument } from '@bloomreach/spa-sdk';
  import VueJsonPretty from 'vue-json-pretty'
  import { computed, defineProps } from 'vue';

  const props = defineProps<{
    component: ContainerItem,
    page: Page
  }>();

  const title = computed(() => props.component.getLabel());
  const componentData = computed(() => JSON.parse(JSON.stringify(props.component)));

  // Content
  let containerItemContent = computed(() => getContainerItemContent(props.component, props.page))

  const models = props.component.getModels();
  let document: any;
  Object.entries(models).forEach(([_, ref]) => {
    document = props.page.getContent(ref);
  })

  const items = [
    {
      label: 'CONTENT',
      slot: 'content',
    },
    {
      label: 'COMPONENT',
      slot: 'component',
    },
    {
      label: 'PROPERTIES',
      slot: 'properties',
    }
  ]
</script>