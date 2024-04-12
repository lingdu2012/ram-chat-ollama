<template>
  <div class="flex flex-col space-y-5 h-screen pb-5">
    <div class="box bg-slate-100 flex justify-between">
      <UButton
        @click="resetAll"
        icon="i-heroicons-plus"
        size="sm"
        color="indigo"
        label="New Chat"
      />
      <ModelSelector v-model="selectedModel" />
    </div>
    <div class="grow">
      <UCard class="h-full">
        <template #header>
          Chat List
          <UButton
          class="float-end"
            icon="i-heroicons-trash"
            label="Delete"
            size="sm"
            color="gray"
            square
            variant="solid"
            @click="deleteAll"
        /></template>
        <div v-for="item in MessageList" :key="item">
          <div
            :class="
              item.id == messageId
                ? 'p-2 truncate cursor-pointer bg-slate-200 rounded hover:bg-slate-50'
                : 'p-2 truncate cursor-pointer rounded hover:bg-slate-50'
            "
            @click="goChat(item)"
          >
            {{ item.model }}::{{ item.id }}
          </div>
          <UDivider />
        </div>
      </UCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useChatContext } from "../composables/useChatPrompt";
import type IChatContext from "../models/IChatContext";
import { PlusIcon } from "@heroicons/vue/24/solid";

const { selectedModel, resetAll,restModel } = useChatContext<IChatContext>();
const MessageList = ref();
const messageId = ref("");
const route = useRoute();
messageId.value = route.params.id;
MessageList.value = JSON.parse(
  localStorage.getItem("chatList") || "[]"
) as Array<{ id: string; message: string }>;

const goChat = (chart:any) => {
    restModel(chart.model);
    navigateTo("/" + chart.id);
};
const deleteAll=()=>{
    MessageList.value=[];
    localStorage.setItem("chatList",JSON.stringify(MessageList.value));
    if(route.params.id){
      navigateTo('/');
    }else{
      location.reload();
    }
}
</script>