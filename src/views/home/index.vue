<!--
 * @Description:  
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-18 11:15:22
-->
<template>
  <div class="home-index">
    <div class="left">
      <span class="history_desc">登录历史</span>
      <BasicTable :dataSource="data" :columns="columns">
        <template #device="{ row }">
          <span>{{ `${row.os}/${row.browser}` }}</span>
        </template>
      </BasicTable>
    </div>
    <div class="right">
      <div class="topdesc">
        欢迎使用
        <br />
        指纹前端基础模板
      </div>
      <img src="/src/assets/image/img_home_pic@2x.png" width="385" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getLoginHistory } from '/@/api/home/home';

  const columns = [
    {
      title: '设备',
      dataIndex: 'device',
      key: 'device',
      align: 'center',
    },
    {
      title: '登录时间',
      dataIndex: 'created',
      key: 'created',
      align: 'center',
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
      key: 'ip',
      align: 'center',
    },
    {
      title: '登录区域',
      dataIndex: 'location',
      key: 'location',
      align: 'center',
    },
  ];

  const data = ref([]);
  getLoginHistory().then(({ list }) => {
    data.value = list;
  });
</script>

<style lang="scss" scoped>
  .home-index {
    display: flex;
    max-width: 1280px;
    margin: auto;
    margin-top: calc(50vh - 348px);
    // margin-top: 60px;
    align-items: center;

    .left {
      flex: 1;

      .history_desc {
        display: block;
        margin-bottom: 10px;
      }
    }

    .right {
      margin-left: 80px;

      .topdesc {
        width: 356px;
        height: 100px;
        font-size: 36px;
        font-weight: 500;
        color: $primaryColor;
        line-height: 50px;
        margin-bottom: 54px;
      }
    }
  }
  // .home {
  //   width: 1360px;
  //   margin: 0 auto;
  //   .hello {
  //     font-size: 36px;
  //     color: $primaryColor;
  //     line-height: 50px;
  //   }
  //   .list {
  //     height: calc(100vh - 140px);
  //   }
  // }
</style>
