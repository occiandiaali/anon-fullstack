<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Anon</ion-title>
        <ion-icon id="open-modal" :icon="createOutline" size="large" slot="end"></ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div>
      <ion-list :inset="true">
      <ion-card v-for="(post, i) in posts" :key="i">
      <ion-card-header>
      <ion-icon :icon="trashBinOutline" id="deleteIcon" color="danger" @click="deletePost(i)"></ion-icon>
      <ion-card-title>{{ post.title }}</ion-card-title>
      
      </ion-card-header>
      <ion-card-content>{{ post.content }}</ion-card-content>
      <ion-label><p style="font-size: 18px;padding: 12px;">Read &raquo;</p> </ion-label>
      </ion-card>
      </ion-list>
      </div>
          <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <!-- <ion-title>Welcome</ion-title> -->
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="createNew()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-input
            label="Post title"
            v-model="postTitle"
            ref="title"
            type="text"
            placeholder="Title"
          ></ion-input>
        </ion-item>
            <ion-item>
      <ion-textarea label="Post content" v-model="postContent" placeholder="Type something here"></ion-textarea>
    </ion-item>
      </ion-content>
    </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue';
import {OverlayEventDetail} from '@ionic/core/components';
import {createOutline, trashBinOutline} from 'ionicons/icons';

type Post = {
  title: string;
  content: string;
}

const message = ref('Testing ground')
const modal = ref();
const postTitle = ref('');
const postContent = ref('');

const newPost = ref<Post>()

const loading = ref(true);
const posts = ref<Post[]>([]);

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
      message.value = `Hello, ${ev.detail.data}!`;
    }
  };

  function deletePost(id: any) {
    fetch(`http://localhost:8200/posts/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        alert(`Post with ID: ${id} successfully deleted!`);
      } else {
        alert('Oops! Could not delete...')
      }
    })
  }

  async function createNew() {
    newPost.value = {
      title: postTitle.value,
      content: postContent.value
    }
    try {
      const res = await fetch('http://localhost:8200/posts', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newPost.value)
      });
      console.log(`Result: ${await res.json()}`)
    } catch (error) {
      console.log('Error: ', error);
    }
        console.log('Title: ', newPost.value.title);
    console.log('Body: ', newPost.value.content);
    modal.value.$el.dismiss(name, 'confirm');
    postTitle.value = "";
    postContent.value = "";
  }

onMounted( async () => {
  try {
    const res = await fetch('http://localhost:8200/posts');
    posts.value = await res.json();
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
  }
})
</script>

<style scoped>
#deleteIcon {
font-size: 20px;
margin: 0px 18px 18px 0px;
}
</style>
