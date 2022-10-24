<!--
 * @Description: 登录
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-28 21:21:04
-->

<template>
  <div class="loginWrap">
    <div class="login">
      <div class="title flex items-center">
        <icon-font type="icon-logo" class="ic_logo_white" />
        <span class="line"></span>
        <span class="name flex-grow">指纹前端基础模板</span>
      </div>
      <div class="mt-80px">
        <a-form ref="formRef" :wrapperCol="{ span: 14, offset: 5 }">
          <a-form-item v-bind="validateInfos.username">
            <a-input v-model:value="formState.username" size="large" placeholder="请输入用户名">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item v-bind="validateInfos.password">
            <a-input-password
              v-model:value="formState.password"
              size="large"
              placeholder="请输入登录密码"
            >
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item v-bind="validateInfos['acs.token']">
            <AliValidate
              v-model:sessionId="formState.acs.sessionid"
              v-model:token="formState.acs.token"
              v-model:sig="formState.acs.sig"
              :form="formRef"
            />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" block size="large" @click.prevent="login">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
  <Footer class="loginFoot" />
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { LoginParams } from '/@/api/others/model/loginModel';
  import { Form } from 'ant-design-vue';
  import { LoginEnum } from '/@/enums/loginEnum';
  import { userStore } from '/@/store/modules/user';
  import Footer from '../../layouts/components/Footer.vue';
  import AliValidate from './components/AliValidate.vue';

  const formRef = ref();
  const formState = reactive<LoginParams>({
    username: '',
    password: '',
    platform: LoginEnum.PLATFORM as number,
    acs: { sessionid: '', token: '', sig: '', scene: LoginEnum.SCENE as string },
  });

  const useForm = Form.useForm;

  const rulesRef = reactive({
    username: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
      },
    ],
    'acs.token': [
      {
        required: true,
        message: '请滑动验证',
      },
    ],
  });

  const { validate, validateInfos } = useForm(formState, rulesRef);

  const store = userStore();
  const login = async () => {
    try {
      await validate();
      store.login(formState);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<style lang="scss" scoped>
  .loginWrap {
    // margin: 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(/src/assets/image/login/login_bg@2x.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .login {
      width: 640px;
      height: 540px;
      background: #ffffff;
      box-shadow: 0px 40px 50px 0px rgba(142, 150, 200, 0.14);
      border-radius: 10px;

      .title {
        height: 110px;
        background: $primaryColor;
        border-radius: 10px 10px 0px 0px;

        .ic_logo_white {
          width: 283px;
          font-size: 172px;
          color: #fff;
        }

        .line {
          width: 1px;
          height: 50px;
          background: #ffffff;
          opacity: 0.2;
          display: inline-block;
        }

        .name {
          font-size: 28px;
          color: #ffffff;
          text-align: center;
        }
      }

      .site-form-item-icon {
        color: $primaryColor;
      }
    }
  }

  .loginFoot {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
