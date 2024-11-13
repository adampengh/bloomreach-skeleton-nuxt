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
  <br-page :configuration="configuration" :mapping="brMapping" :page="page">
    <template v-slot="{ page }">
      <template v-if="page">
        <BrPageDetails :page="page" :configuration="configuration"/>

        <section class="container flex-fill pt-3">
          <BrContainers :page="page" />
        </section>
      </template>
    </template>
  </br-page>
</template>

<script setup lang="ts">
import axios from 'axios';
import { BrComponent, BrPage } from '@bloomreach/vue-sdk';
import { initialize } from '@bloomreach/spa-sdk';
import { buildConfiguration } from '~/utils/buildConfiguration';
import { brMapping } from '~/utils/brMapping';
import { flatten } from '~/utils/flatten';

const config = useRuntimeConfig();
const route = useRoute();

const endpoint = config.public.NUXT_APP_BRXM_ENDPOINT ?? '';
const configuration = {
  ...buildConfiguration(`${route.fullPath}`, axios, endpoint),
};

const { data } = await useAsyncData(async (context) => {
  const page = await initialize({
    ...configuration,
    httpClient: axios,
    request: context?.ssrContext?.event?.node?.req,
  });

  return { page: page.toJSON() };
})

const page = data.value?.page;
</script>