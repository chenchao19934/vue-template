<!--
 * @Description: 我的账号
 * @Autor: zwy
 * @Date: 2022-01-18 11:11:33
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-21 16:42:14
-->

<template>
  <div class="class-content">
    <Breadcrumb :data="['账号管理', '我的账号']" />
    <div class="page_main">
      <div class="aside-form">
        <a-row>
          <a-col :offset="2">
            <a-descriptions title="个人资料" :column="1">
              <a-descriptions-item
                v-for="(item, index) in list"
                :key="index"
                :label="item.label"
                :labelStyle="{
                  justifyContent: 'flex-end',
                  minWidth: 100,
                }"
              >
                <template v-if="item.key">
                  <div class="login-location">
                    <span>{{ loginLocation }}</span>
                    <div class="edit">
                      <span class="btn-opera" @click="showSetLocation = true">编辑</span>
                      <span class="edit-desc">默认显示3个，点击编辑查看更多</span></div
                    >
                  </div>
                </template>
                <template v-else>
                  {{ item?.value }}
                </template>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
        </a-row>
        <LoginLocationModal
          v-model="showSetLocation"
          :data="data"
          :customer-id="userInfo?.id"
          @del-data="deleteData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LoginLocationModal from './components/LoginLocationModal.vue';
  import { userStore } from '/@/store/modules/user';
  import { computed, onMounted, ref } from 'vue';

  type DataType = {
    location: string;
    id: string;
  };
  const store = userStore();
  const userInfo = computed(() => store.userInfo);
  const showSetLocation = ref(false);
  const data = computed(() => {
    let locations = userInfo.value?.locations;
    if (locations) {
      return locations.map((item, index) => ({
        location: item,
        id: `${index}-${item}`,
      }));
    } else {
      return [];
    }
  });
  const loginLocation = computed(() => userInfo.value?.locations?.slice(0, 3)?.join('，'));
  const deleteData = (dataInfo: DataType) => {
    store.updateUserInfoLocation(dataInfo);
  };
  const list = [
    {
      label: '用户名',
      value: userInfo.value?.username,
    },
    {
      label: '账号编号',
      value: userInfo.value?.code,
    },
    {
      label: '真实姓名',
      value: userInfo.value?.realname,
    },
    {
      label: '账号类型',
      value: userInfo.value?.level === 9 ? '主账号' : '子账号',
    },
    {
      label: '邮箱',
      value: userInfo.value?.email,
    },
    {
      label: '手机号',
      value: userInfo.value?.mobile,
    },
    {
      label: '注册时间',
      value: userInfo.value?.created,
    },
    {
      label: '最后登录',
      value: userInfo.value?.last_login_time,
    },
    { label: '登录地区', key: 'loginLocation' },
  ];
  onMounted(() => {
    store.getUserInfo();
  });
</script>

<style scoped lang="scss">
  .aside-form {
    .login-location {
      display: flex;

      .edit {
        margin-left: 120px;

        .edit-desc {
          height: 22px;
          font-size: 14px;
          font-weight: 400;
          color: #999;
          line-height: 22px;
          margin-left: 20px;
        }
      }
    }
  }

  :deep(.ant-descriptions-row > td),
  :deep(.ant-descriptions-row > th) {
    padding-bottom: 30px;
  }

  :deep(.ant-descriptions-item-container .ant-descriptions-item-label) {
    width: 110px;
    margin-right: 60px;
  }

  :deep(.ant-descriptions-title) {
    display: block;
    height: 28px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    margin-bottom: 4px;
  }
</style>
