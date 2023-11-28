<template>
  <div class="page justify-end">
    <div class="hero"></div>
    <div class="form_container flex justify-center items-center">
      <div class="logo flex items-center gap-4">
        <img src="./../../assets/logo.svg" alt="">
        <span class="font-medium">账号登录</span>
      </div>
      <a-form ref="formRef" class="form_main" :model="formState" name="basic" autocomplete="true" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-tabs v-model:activeKey="activeKey" animated size="large" @change="onTabsChange">
          <a-tab-pane key="1" tab="账号">
            <a-form-item class="w-full" name="username"
              :rules="[{ required: true, message: '请输入您的账号' }, { validator: checkAccount }]">
              <a-input v-model:value="formState.username" size="large" class="w-full" placeholder="手机号/邮箱/账号">
                <template #prefix>
                  <UserOutlined style="color: var(--vt-c-text-2);" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: '请输入您的密码' }, { validator: checkPassword }]">
              <a-input-password v-model:value="formState.password" autocomplete="off" size="large" placeholder="密码">
                <template #prefix>
                  <LockOutlined style="color: var(--vt-c-text-2);" />
                </template>
              </a-input-password>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="手机号" force-render>
            <a-form-item class="w-full" name="phone"
              :rules="[{ required: true, message: '请输入您的手机号' }, { validator: checkPhone }]">
              <a-input v-model:value="formState.phone" size="large" class="w-full" placeholder="手机号" :maxlength="11">
                <template #prefix>
                  <UserOutlined style="color: var(--vt-c-text-2);" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="code"
              :rules="[{ required: true, message: '请输入您的验证码' }, { type: 'number', message: '请输入六位数字验证码' }]">
              <a-input v-model:value="formState.code" size="large" placeholder="验证码" :maxlength="6">
                <template #prefix>
                  <SafetyOutlined style="color: var(--vt-c-text-2);" />
                </template>
                <template #addonAfter>
                  <div class="code" @click="getCode">{{ `${codeText}${codeStatus ? 's' : ''}` }}</div>
                </template>
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-checkbox v-model:checked="formState.remember">已同意<a>用户协议</a>和<a>隐私政策</a></a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button class="w-full" type="primary" html-type="submit" size="large">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ActiveKeyType } from 'ant-design-vue/es/collapse/commonProps';
import { checkAccount, checkPassword, checkPhone } from '@/utils/validator'

const formState = reactive<FormState>({
  username: '',
  password: '',
  phone: '',
  code: '',
  remember: true,
});
const formRef = ref()
const activeKey = ref<string>('1');
const codeText = ref<number | string>('获取验证码');
const codeStatus = ref<boolean>(false);
const codeTimer = ref<any>(null);
const loginType = ref<ActiveKeyType>('1')

interface FormState {
  username: string;
  password: string;
  phone: string;
  code: string;
  remember: boolean;
}

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const onTabsChange = (e: ActiveKeyType) => {
  formRef.value.clearValidate()
  loginType.value = e
}

const getCode = () => {
  if (codeStatus.value) return
  message.success('验证码已发送')
  codeStatus.value = true
  codeText.value = 60
  codeTimer.value = setInterval(() => {
    codeText.value = codeText.value as number - 1
    if (codeText.value as number === 0) {
      codeStatus.value = false
      clearInterval(codeTimer.value)
      codeText.value = '获取验证码'
    }
  }, 1000)
}
</script>

<style lang="less" scoped>
::v-deep(.ant-input-prefix) {
  margin-inline-end: 7px;
}

::v-deep(.ant-tabs-top >.ant-tabs-nav::before) {
  border: none;
}

::v-deep(.ant-tabs-top >.ant-tabs-nav .ant-tabs-ink-bar) {
  border-radius: 2px;
  height: 2.5px;
}

::v-deep(.ant-tabs-large >.ant-tabs-nav .ant-tabs-tab) {
  padding-top: 0;
}

.page {
  display: flex;

  .hero {
    width: calc(25% + 2rem);
    height: 100vh;
    background-image: url('./../../assets/image/hero.jpg');
    background-size: auto 100%;
    background-position: center;
    position: absolute;
    left: 0;
    top: 0;
    filter: grayscale(0%); 
  }

  .form_container {
    width: 75%;
    height: 100vh;
    background-color: var(--vt-c-bg);
    // background-color: var(--vt-c-bg-soft);
    // border-top-left-radius: 2rem;
    // border-bottom-left-radius: 2rem;
    overflow: hidden;
    position: relative;

    .logo {
      width: auto;
      height: auto;
      margin: 1.5rem;
      position: absolute;
      left: 0;
      top: 0;

      img {
        width: 50px;
      }

      span {
        font-size: 1.5rem;
        color: var(--vt-c-text-1);
      }
    }

    .form_main {
      width: 400px;
      overflow: hidden;
      background-color: var(--vt-c-bg-soft);
      padding: 2rem;
      border-radius: 6px;
      box-shadow: var(--vt-shadow-1);

      .code {
        cursor: pointer;
        width: 70px;
        user-select: none;
      }
    }
  }
}
</style>