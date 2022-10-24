<!--
 * @Description: 账号安全设置入口
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 14:53:41
-->

<template>
  <div class="class-content">
    <Breadcrumb :data="['账号管理', '账号安全设置']" />
    <div class="page_main">
      <div class="aside-form"> <AccountSetList :data="dataResult" /> </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getAccountSafetySetInfoApi } from '/@/api/systemSetting/accountManage/accountSet';
  import {
    SafetyInfoModel,
    ListItemType,
  } from '/@/api/systemSetting/accountManage/model/myAccountModel';
  import AccountSetList from './AccountSetList.vue';
  import { userStore } from '/@/store/modules/user';
  import { ref, ComponentPublicInstance, getCurrentInstance, onMounted } from 'vue';

  const store = userStore();
  let dataResult = ref<Array<ListItemType & SafetyInfoModel>>([]);

  const getSafetyInfo = async () => {
    const data = await getAccountSafetySetInfoApi();
    // console.log('55550000', JSON.stringify(data));
    if (data) {
      // store.setOnLineHour(data?.online_hours);//不需要
      const arr = [
        {
          type: 'password',
          top: '登录密码',
          ...data,
          bottom: '安全性高的密码可以使用功能账号更安全，建议您定期更换密码以保护账号安全。',
        },
        {
          type: 'mobile',
          top: '绑定手机号',
          bottom: data.mobile
            ? `您的账号已绑定手机号${data.mobile}，您可以用手机号登录、找回密码等，若该号码已丢失或停用，为了您的账号安全请立即联系客服更换号码。`
            : '您尚未绑定手机号',
          ...data,
        },
        {
          type: 'email',
          top: '绑定邮箱',
          bottom: data.email
            ? `您的账号已绑定邮箱${data.email}，您可以用邮箱登录、找回密码等`
            : '尚未绑定邮箱，邮箱可以用于找回密码、接收通知等，若邮箱丢失或停用，为了您的账号安全请立即更换。',
          ...data,
        },
        {
          type: 'keeptime',
          top: '登录保持时间',
          bottom: `您可以设置保持登录的时间长度，超过该时间未操作系统会退出登录，目前设置的时间为${data.online_hours}小时。`,
          ...data,
        },
      ];
      dataResult.value = arr;
    }
  };

  onMounted(() => {
    getSafetyInfo();
  });
  const proxy = getCurrentInstance()?.proxy as ComponentPublicInstance<any>;
  const $bus = proxy.$bus;
  $bus.on('updateAccountInfo', () => {
    getSafetyInfo();
    store.getUserInfo();
  });
</script>

<style scoped lang="scss">
  .aside-form {
    .title {
      display: block;
      height: 28px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 28px;
      margin-bottom: 40px;
    }
  }
</style>
