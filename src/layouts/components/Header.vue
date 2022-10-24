<!--
 * @Description: 头部导航栏
 * @Autor: zwy
 * @Date: 2022-01-19 09:19:03
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-28 21:34:41
-->
<template>
  <div class="head-nav flex-center">
    <div class="logo" @click="toHome">
      <icon-font type="icon-logo_zdh" class="ml-20px" style="font-size: 200px; color: white" />
    </div>
    <div class="nav">
      <a-menu v-model:selectedKeys="activeKeys" mode="horizontal">
        <template v-for="item in navList" :key="'' + item.id">
          <template v-if="!item.children">
            <a-menu-item :key="'' + item.id">
              <router-link :to="'/' + item.path"> {{ item.title }} </router-link>
            </a-menu-item>
          </template>
          <template v-else>
            <SubMenu :key="'' + item.id" :menu-info="item" />
          </template>
        </template>
      </a-menu>
    </div>
    <a-dropdown>
      <div class="user-wap">
        <span class="user-text">
          {{ userStore.userInfo?.realname }}
          <caret-down-outlined class="ml-4px" style="font-size: 12px" />
        </span>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="handleLout">
            <div class="logout"
              ><icon-font type="icon-icon_quit" style="font-size: 20px" /><span>退出登录</span></div
            >
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  import SubMenu from './SubMenu.vue';
  import { useRouter } from 'vue-router';
  import { userStoreWithOut } from '/@/store/modules/user';

  const userStore = userStoreWithOut();
  const navList = computed(() => userStore.navList);
  const router = useRouter();
  const activeKeys = ref<string[] | undefined>(['']);

  //保持刷新选中状态
  const setCurrentRoute = () => {
    const id = (router.currentRoute.value.meta.id ?? '') as string;
    activeKeys.value = [id.toString()];
  };

  watch(
    () => router,
    () => {
      setCurrentRoute();
    },
    { immediate: true, deep: true }
  );

  const handleLout = async () => {
    userStore.logout();
  };
  const toHome = () => {
    router.push({
      path: '/index',
    });
  };
</script>
<style scoped lang="scss">
  .logout {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-wap {
    display: flex;
    margin-right: 36px;
    align-items: center;
    height: 60px;
    line-height: 60px;

    .user-text {
      display: block;
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;
      padding: 0 10px;
      border-radius: 2px;
      background: $primaryColorActive;
      text-align: center;
      height: 32px;
      line-height: 32px;

      &:hover {
        .anticon {
          transform: rotate(180deg);
          transition: transform 0.4s ease;
        }
      }
    }
  }

  .head-nav {
    display: flex;
    background-color: $primaryColor;
    height: 60px;

    .logo {
      display: flex;
      align-items: center;
      width: 290px;
      cursor: pointer;

      .logo-desc {
        color: #fff;
      }
    }

    .nav {
      flex: 1;
    }
  }
  // 导航栏
  .nav {
    :deep(.ant-menu-horizontal) {
      line-height: 60px;
      border-bottom: 0;
    }

    :deep(.ant-menu) {
      background: $primaryColor;
      color: #fff;
      font-weight: 600;
    }

    :deep(.ant-menu-title-content),
    :deep(.ant-menu-submenu-title:hover),
    :deep(.ant-menu-horizontal > .ant-menu-item a:hover) {
      color: #fff;
      opacity: 1;
    }

    :deep(.ant-menu-horizontal > .ant-menu-item-active:hover),
    :deep(.ant-menu-horizontal > .ant-menu-item:hover),
    :deep(.ant-menu-submenu-selected),
    :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected) {
      //首页-无子菜单
      background-color: $primaryColorActive;
      font-weight: bold;
    }

    :deep(.ant-menu-horizontal > .ant-menu-submenu:hover) {
      background-color: $primaryColorActive;
    }

    :deep(.ant-menu-item-only-child) {
      //首页-无子菜单
      &:hover {
        background: $primaryColorActive !important;
      }
    }

    :deep(.ant-menu-horizontal > .ant-menu-item a) {
      color: #fff;
    }
  }

  .ant-menu-inline .ant-menu-item:not(:last-child),
  .ant-menu-vertical-left .ant-menu-item:not(:last-child),
  .ant-menu-vertical-right .ant-menu-item:not(:last-child),
  .ant-menu-vertical .ant-menu-item:not(:last-child) {
    margin-bottom: 0 !important;
  }

  .ant-menu-horizontal > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0 20px !important;
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
    padding: 0 !important;
  }
</style>

<style>
  .ant-menu-vertical > .ant-menu-item,
  .ant-menu-vertical-left > .ant-menu-item,
  .ant-menu-vertical-right > .ant-menu-item,
  .ant-menu-inline > .ant-menu-item,
  .ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    height: 32px;
    line-height: 32px;
  }

  .ant-menu-horizontal > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0 20px !important;
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
    padding: 0 !important;
  }
</style>
