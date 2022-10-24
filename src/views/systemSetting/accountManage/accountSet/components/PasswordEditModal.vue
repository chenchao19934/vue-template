<!--
 * @Description: 修改登录密码
 * @Autor: zwy
 * @Date: 2022-01-25 11:49:19
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-17 10:02:25
-->

<template>
  <a-modal
    :visible="modelValue"
    title="修改密码"
    :width="600"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    :confirmLoading="loading"
    @cancel="close"
    @ok="updatePassword"
  >
    <a-form
      :model="passwordForm"
      autocomplete="off"
      layout="horizontal"
      :label-col="{ style: 'width: 110px' }"
      class="form-class"
    >
      <a-form-item label="旧密码：" name="oldPassword" v-bind="validateInfos.oldPassword">
        <a-input-password
          v-model:value="passwordForm.oldPassword"
          allowClear
          placeholder="6-20位数字、字母、符号组合"
        />
      </a-form-item>
      <a-form-item label="新密码：" name="newPassword" v-bind="validateInfos.newPassword">
        <a-input-password
          v-model:value="passwordForm.newPassword"
          allowClear
          placeholder="请输入6-20位密码,需包含数字、字母、符号任意2种"
        />
        <div class="_strength" :class="`is-level${passwordLevel}`">
          <a-tag
            v-for="(level, index) in PasswordLevelObj"
            :key="index"
            :color="passwordLevel >= index ? 'warning' : 'default'"
            >{{ level }}</a-tag
          >
        </div>
      </a-form-item>
      <a-form-item
        label="重复新密码："
        name="newConfirmPassword"
        v-bind="validateInfos.newConfirmPassword"
      >
        <a-input-password
          v-model:value="passwordForm.newConfirmPassword"
          allowClear
          placeholder="请输入6-20位密码,需包含数字、字母、符号任意2种"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import { PasswordLevelObj } from '/@/enums/common';
  import { getPasswordLevel } from '/@/utils/passwordUtil';
  import { userStore } from '/@/store/modules/user';
  import { resetPasswordApi } from '/@/api/systemSetting/accountManage/accountSet';
  import { LAST_CLICK_TIME } from '/@/enums/cacheEnum';
  import { useRouter } from 'vue-router';
  import { Form, message } from 'ant-design-vue';

  const store = userStore();
  const router = useRouter();
  let loading = ref(false);
  type UpdatePasswordType = {
    modelValue: boolean;
  };

  withDefaults(defineProps<UpdatePasswordType>(), { modelValue: false });
  const emit = defineEmits(['update:modelValue']);
  const passwordForm = reactive({
    oldPassword: '',
    newPassword: '',
    newConfirmPassword: '',
  });
  const passwordLevel = computed(() => getPasswordLevel(passwordForm.newPassword));
  const validatePassword = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请输入新的密码');
      }
      const reg = /^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,20}$/;
      if (reg.test(value)) {
        if (value == passwordForm.oldPassword) {
          reject('新的密码不能和旧的密码一致');
        } else {
          if (passwordLevel.value < 2) {
            reject('密码强度过低，极易被破解，请设置中级以上');
          } else {
            resolve('');
          }
        }
      } else {
        reject('6-20位字符，必须包含数字、字母和符号任意两种、密码强度必须达到中以上');
      }
    });
  };

  const validateConfirmPassword = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请确认密码');
      }
      if (value !== passwordForm.newPassword) {
        reject('两次输入的密码不一致');
      } else {
        resolve('');
      }
    });
  };
  const rules = ref<any>({
    oldPassword: [{ required: true, message: '请输入旧的密码' }],
    newPassword: [{ required: true, validator: validatePassword }],
    newConfirmPassword: [{ required: true, validator: validateConfirmPassword }],
  });
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(passwordForm, rules);
  const close = () => {
    resetFields();
    emit('update:modelValue', false);
  };
  const updatePassword = () => {
    validate().then(async () => {
      try {
        loading.value = true;
        const { oldPassword, newPassword } = passwordForm;
        const params = { old_password: oldPassword, new_password: newPassword };
        await resetPasswordApi(params);
        message.success('密码修改成功,请重新登录');
        localStorage.removeItem(LAST_CLICK_TIME);
        store.removeToken();
        store.removeNavList();
        store.resetUser();
        router.replace('/login');
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    });
  };
</script>
