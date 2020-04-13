<template>
  <div id="dashboard">
      <b-container fluid>
          <h2>Mijn captions</h2>
          <b-row>
              <b-col lg="3">
                  
                    <div class="video-item">
                        <img src="https://gproinc.com.ng/wp-content/uploads/2019/09/Video-thumbnail-1024x576.jpg" alt="" srcset="">
                        <p><strong>Caption name</strong></p>
                        <router-link :to="{name: 'CaptionItem', params: {id: 1}}">
                            <eye-icon size="1.5x" class="icon"></eye-icon>
                        </router-link>
                        <router-link :to="{name: 'EditCaptionItem', params: {id: 1}}">
                            <edit-icon size="1.5x" class="icon"></edit-icon>
                        </router-link>
                    </div>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
import { EditIcon, EyeIcon   } from 'vue-feather-icons'
export default {
    components:{
        EditIcon,
        EyeIcon
    }
}
</script>

<style>

</style>