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
    BrContainers
    <!-- <div :v-for="(container, index) in containers" :key="index">

    </div> -->
  </div>
</template>

<script setup lang="ts">
  import type { Page } from '@bloomreach/spa-sdk';
  import { defineProps } from 'vue';

  const props = defineProps<{
    page: Page
  }>();

  const page = props.page;

  const containers = page.getComponent().getChildren();
  console.log('containers', containers)

</script>