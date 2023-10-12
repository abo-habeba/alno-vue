<template>
  <div class="auth">
    <nav>
      <v-row>
        <v-col> </v-col>
        <v-col>
          <v-btn block color="primary" to="/auth/login">{{
            $t("LogIn")
          }}</v-btn>
        </v-col>
        <v-col>
          <v-btn block color="secondary" to="/auth/register">{{
            $t("register")
          }}</v-btn>
        </v-col>
        <v-col> </v-col>
      </v-row>
    </nav>
    <router-view />
  </div>
</template>

<script setup></script>
<style>
.auth {
  max-width: 500px;
  margin: 10% auto;
}
</style>
