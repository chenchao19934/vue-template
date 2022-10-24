<!--
 * @Description: 账号安全设置页面
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-22 09:35:03
-->

<template>
  <div v-if="data?.length > 0" class="acset">
    <ListItem v-for="(item, index) in data" :key="index">
      <template #top>
        <div class="account-top-con">
          <span class="account-top">{{ item.top }}</span>
          <template v-if="item.type === 'password'">
            <div :class="[`is-level${item.password_level}`]" class="_strength">
              <a-tag
                v-for="(level, i) in passwordLevelArray"
                :key="i"
                :color="item.password_level >= i ? 'warning' : 'default'"
                >{{ level }}</a-tag
              >
              <span class="pass-desc">安全程度{{ PasswordLevelObj[item.password_level] }}</span>
            </div>
          </template>
        </div>
      </template>
      <template #bottom>
        <a-popover
          :disabled="item.type !== 'rule' || (item.type === 'rule' && !item?.bottomPopContent)"
          placement="bottom"
          title="IP限制"
          :content="item?.bottomPopContent"
        >
          <span class="account-bottom" :class="{ rulebottom: item.type === 'rule' }">{{
            item.bottom
          }}</span>
        </a-popover>

        <template v-if="item.type === 'password' && Number(item.days) >= 60">
          <span class="account-bottom-desc">距离上次修改密码已过去：{{ item.days }}天</span>
        </template>
      </template>
      <template #right>
        <div v-if="item.type === 'password'" class="right_con">
          <icon-font type="icon-icon_qianshou" style="font-size: 20px" />
          <span class="set-pre">已设置</span>
          <a-divider type="vertical" />
          <span class="btn-style" @click="passwordVisible = true">修改</span>
        </div>
        <div v-else-if="item.type === 'mobile'" class="right_con">
          <template v-if="item.mobile">
            <icon-font type="icon-icon_qianshou" style="font-size: 20px" />
            <span class="set-pre">已绑定</span>
            <a-divider type="vertical" />
            <span class="btn-style" @click="cellPhoneClick(item.mobile, item.email)">修改</span>
          </template>
          <template v-else>
            <a-button @click="cellPhoneClick(item.mobile, item.email)">立即绑定</a-button>
          </template>
        </div>
        <div v-else-if="item.type === 'email'" class="right_con">
          <template v-if="item.email">
            <icon-font type="icon-icon_qianshou" style="font-size: 20px" />
            <span class="set-pre">已绑定</span>
            <a-divider type="vertical" />
            <span class="btn-style" @click="emailClick(item.mobile, item.email)">修改</span>
          </template>
          <template v-else>
            <a-button @click="emailClick(item.mobile, item.email)">立即绑定</a-button>
          </template>
        </div>
        <div v-else class="right_con">
          <icon-font type="icon-icon_qianshou" style="font-size: 20px" />
          <span class="set-pre">已设置</span>
          <a-divider type="vertical" />
          <span class="btn-style" @click="timeClick(item.online_hours)">修改</span>
        </div>
      </template>
    </ListItem>
    <PasswordEditModal v-model="passwordVisible" />
    <PhoneEditModal
      v-model="phoneVisible"
      :module="1"
      :old-mobile="oldMobile"
      :cellPhoneCheckType="cellPhoneCheckType"
    />
    <PhoneVerifyModal
      v-model="verifyPhoneVisible"
      :old-email="oldEmail"
      :old-mobile="oldMobile"
      @render-set-cell-phone="renderSetCellPhone"
    />
    <EmailVerifyModal
      v-model="emailVisible"
      :old-mobile="oldMobile"
      :old-email="oldEmail"
      @render-set-email="renderSetEmail"
    />
    <EmailEditModal
      v-model="verifyEmailVisible"
      :old-email="oldEmail"
      :cellPhoneCheckType="cellPhoneCheckType"
    />
    <OnLineTimeEditModal v-model="onlineTimeVisible" :init-hours="initHours" />
  </div>
</template>

<script setup lang="ts">
  import OnLineTimeEditModal from './components/OnLineTimeEditModal.vue';
  import EmailEditModal from './components/EmailEditModal.vue';
  import PhoneVerifyModal from './components/PhoneVerifyModal.vue';
  import PhoneEditModal from './components/PhoneEditModal.vue';
  import PasswordEditModal from './components/PasswordEditModal.vue';
  import EmailVerifyModal from './components/EmailVerifyModal.vue';
  import ListItem from './components/ListItem.vue';
  import {
    SafetyInfoModel,
    ListItemType,
  } from '/@/api/systemSetting/accountManage/model/myAccountModel';
  import { PasswordLevelObj } from '/@/enums/common';
  import { computed, ref } from 'vue';

  type ZWListProps<T extends ListItemType> = {
    data: Array<T>;
  };
  defineProps<ZWListProps<ListItemType & SafetyInfoModel>>();
  const passwordVisible = ref(false);
  const phoneVisible = ref(false);
  const verifyPhoneVisible = ref(false);
  const emailVisible = ref(false);
  const verifyEmailVisible = ref(false);
  const onlineTimeVisible = ref(false);
  const oldMobile = ref('');
  const oldEmail = ref('');
  const initHours = ref(0);
  const cellPhoneCheckType = ref(0);
  const cellPhoneClick = (cellPhone: string, email: string) => {
    // console.log('0000000', cellPhone);
    oldMobile.value = cellPhone;
    oldEmail.value = email;
    if (cellPhone) {
      verifyPhoneVisible.value = true;
    } else {
      phoneVisible.value = true;
    }
  };
  const emailClick = (cellphone: string, email: string) => {
    oldMobile.value = cellphone;
    oldEmail.value = email;
    if (!cellphone && !email) {
      verifyEmailVisible.value = true;
    } else {
      emailVisible.value = true;
    }
  };
  const timeClick = (hour) => {
    initHours.value = hour;
    onlineTimeVisible.value = true;
  };

  const passwordLevelArray = computed(() => PasswordLevelObj);
  const renderSetCellPhone = (checkType) => {
    cellPhoneCheckType.value = checkType;
    phoneVisible.value = true;
  };
  const renderSetEmail = (checkType) => {
    cellPhoneCheckType.value = checkType;
    verifyEmailVisible.value = true;
  };
</script>

<style scoped lang="scss">
  .pass-desc {
    height: 18px;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  }

  ._strength {
    margin-top: 0px;
  }

  .right_con {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.ant-divider-vertical) {
      height: 18px;
      margin: 0 10px;
      background-color: #e4e4e4;
    }
  }

  .acset {
    background: #fff;
  }

  .btn-style {
    color: $primaryColor;
    cursor: pointer;

    &:hover {
      color: #66b1ff;
      font-weight: 600;
    }
  }

  .account-top-con {
    display: flex;
    align-items: center;

    .account-top {
      height: 24px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
      line-height: 24px;
    }
  }

  .account-bottom {
    height: 18px;
    font-size: 12px;
    font-weight: 400;
    color: #666;
    line-height: 18px;
  }

  .rulebottom {
    display: block;
    width: 600px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .account-bottom-desc {
    height: 18px;
    font-size: 12px;
    font-weight: 400;
    color: #ff4d4f;
    line-height: 18px;
  }

  .set-pre {
    height: 22px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    line-height: 22px;
    margin-left: 18px;
  }
</style>
