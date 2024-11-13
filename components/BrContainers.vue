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
    <div v-for="(container, index) in containers" :key="index">
      <UCard :ui="{
        base: 'mb-3',
        background: 'bg-white dark:bg-gray-900',
        divide: 'divide-slate-300 dark:divide-slate-200',
        ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
        rounded: '',
        shadow: 'shadow',
        header: {
          base: '',
          background: 'bg-primary-500',
          padding: 'p-2'
        },
        body: {
          base: '',
          background: '',
          padding: 'p-2'
        },
      }">
        <template #header >
          <h1 class="text-xl text-white font-bold">{{ container.path }}</h1>
        </template>
        <br-component :component="container.path" />
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { isComponent, isContainer, isContainerItem, type Page } from '@bloomreach/spa-sdk';
  import { BrComponent, BrPage } from '@bloomreach/vue-sdk';
  import { defineProps } from 'vue';

  const props = defineProps<{
    page: Page
  }>();

  const containers = flatten(props.page.getComponent().getChildren())
    .filter(value => value.type === 'container');
  console.log('containers', containers);
</script>