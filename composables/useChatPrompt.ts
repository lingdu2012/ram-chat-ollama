export function useChatContext<T>() {
  const prompt = ref();
  const aiAnswer = ref("");
  const chatContext = ref<T[]>([]) as Ref<T[]>;
  const loadingAnswer = ref<boolean>(false);
  const selectedModel = useState<string>('selectedModel', () =>"Change Model");

  const resetPrompt = () => {
    prompt.value = "";
  };

  const addChatContextItem = (item: T) => {
    chatContext.value.push(item);
    aiAnswer.value = "";
  };

  const getContextToString = (): string => {
    return JSON.stringify(chatContext.value);
  };

  const toggleLoading = () => {
    loadingAnswer.value = !loadingAnswer.value;
  };

  const resetAll = () => {
    chatContext.value = [];
    prompt.value = "";
    const route = useRoute();
    if(route.params.id){
      navigateTo('/');
    }else{
      location.reload();
    }
  };

  const restModel = (model:string) => {
    selectedModel.value = model;
  }
  return {
    resetPrompt,
    resetAll,
    addChatContextItem,
    getContextToString,
    prompt,
    chatContext,
    aiAnswer,
    loadingAnswer,
    toggleLoading,
    selectedModel,
    restModel
  };
}