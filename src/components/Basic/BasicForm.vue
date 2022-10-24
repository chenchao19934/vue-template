<!--
 * @Description: 动态表单开发
 * @Autor: zwy
 * @Date: 2022-01-07 15:49:18
 * @LastEditors: zwy
 * @LastEditTime: 2022-03-10 18:30:52
-->

<template>
  <!-- v-bind="{ ...$attrs, ...$props, ...formProps }" -->
  <a-form
    v-bind="formProps"
    :model="form"
    :layout="layout"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    autocomplete="off"
  >
    <template v-for="(item, bind) in items" :key="bind">
      <a-form-item :name="bind" :label="`${item.label}：`">
        <component
          :is="item.component"
          v-model:value="form[bind]"
          v-bind="item.props || {}"
          style="margin-bottom: 20px; margin-right: 20px"
          :style="item.component.name === 'ARangePicker' ? 'width: 350px' : 'width: 260px'"
        />
      </a-form-item>
    </template>
  </a-form>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { FormItemsType } from '/@/api/others/model/commonModel';

  type BasicFormProps = {
    condition: object;
    items: FormItemsType;
    layout?: 'horizontal' | 'vertical' | 'inline';
    labelCol?: object;
    wrapperCol?: object;
  };
  const props = withDefaults(defineProps<BasicFormProps>(), {
    layout: 'inline',
    labelAlign: 'right',
  });
  const form = computed(() => {
    return props.condition;
  });
  const formProps = computed(() => {
    const { layout, labelAlign, labelCol, wrapperCol } = props;
    return { layout, labelAlign, labelCol, wrapperCol, model: form.value, autocomplete: 'off' };
  });
</script>
