<template>
  <fwb-navbar solid>
    <template #logo>
      <a href=""></a>
    </template>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link is-active link="#"> Home </fwb-navbar-link>
        <fwb-navbar-link link="#"> Services </fwb-navbar-link>
        <fwb-navbar-link link="#"> Pricing </fwb-navbar-link>
        <fwb-navbar-link link="#"> Contact </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>

<script setup>
  import {
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink,
    FwbNavbarLogo,
  } from "flowbite-vue";
</script>
