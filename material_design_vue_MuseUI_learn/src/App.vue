<template>
  <div>
    <mu-appbar title="财监会">
      <mu-icon-button icon='menu' slot="left" @click="toggle(true)"/>
      <mu-icon-button icon='expand_more' slot="right"/>
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
        <mu-list @itemClick="docked ? '' : toggle()">
          <mu-list-item title="Menu Item 1"/>
          <mu-list-item title="Menu Item 2"/>
          <mu-list-item title="Menu Item 3"/>
          <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
        </mu-list>
      </mu-drawer>
    <br>
    <mu-auto-complete hintText="请随便输入点啥" labelFloat label="整行" fullWidth @input="handleInput" :dataSource="dataSource"/>
    <br>
    <mu-list>
      <mu-list-item title="图标"disabled>
        <mu-avatar slot="left" icon="folder"/>
      </mu-list-item>
      <mu-list-item title="图标, 自定义大小、颜色"disabled>
        <mu-avatar slot="left" icon="folder" color="orange200" backgroundColor="pink400" :size="30" :iconSize="20"/>
      </mu-list-item>
      <mu-list-item title="Elyar" disabled>
        <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">Elyar</mu-avatar>
      </mu-list-item>
    </mu-list>
    <br>



    <mu-paper style="max-width: 376px; ">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"/>
      <mu-bottom-nav-item value="music" title="Music" icon="music_note"/>
      <mu-bottom-nav-item value="books" title="Books" icon="books"/>
      <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"/>
    </mu-bottom-nav>
    </mu-paper>
    <br>




    <mu-raised-button @click="openBottomSheet" label="Open Bottom Sheet" />
      <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
        <mu-list @itemClick="closeBottomSheet">
          <mu-sub-header>
            请选择一个
          </mu-sub-header>
          <mu-list-item title="1"/>
          <mu-list-item title="2"/>
          <mu-list-item title="3"/>
          <mu-list-item title="4"/>
        </mu-list>
      </mu-bottom-sheet>
      <br>
      
      <mu-date-picker hintText="竖屏模式选择"/>
      <br>
      <mu-raised-button label="dialog" @click="openO"/>
      <mu-dialog :open="dialog" title="Dialog" @close="closeC">
        这是一个简单的弹出框
        <mu-flat-button slot="actions" @click="closeC" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="closeC" label="确定"/>
      </mu-dialog>
      <br>

      <mu-paper class="demo-menu">
        <mu-menu desktop>
          <mu-menu-item title="Bold" afterText="⌘B"/>
          <mu-menu-item title="Italic" afterText="⌘I"/>
          <mu-menu-item title="Underline" afterText="⌘U"/>
          <mu-menu-item title="Strikethrough" afterText="Alt+Shift+5"/>
          <mu-menu-item title="Superscript" afterText="⌘."/>
          <mu-menu-item title="Subscript" afterText="⌘,"/>
          <mu-divider />
          <mu-menu-item title="1.15" inset/>
          <mu-menu-item title="Double" inset/>
          <mu-menu-item title="Custom: 1.2" rightIcon="keyboard_arrow_right" leftIcon="check">
            <mu-menu-item title="Show" rightIcon="keyboard_arrow_right">
              <mu-menu-item title="Show Level 2" />
              <mu-menu-item title="Grid lines" leftIcon="check" />
              <mu-menu-item title="Page breaks" inset/>
              <mu-menu-item title="Rules" leftIcon="check" />
            </mu-menu-item>
            <mu-menu-item title="Grid lines" leftIcon="check" />
            <mu-menu-item title="Page breaks" inset/>
            <mu-menu-item title="Rules" leftIcon="check" />
          </mu-menu-item>
          <mu-divider />
          <mu-menu-item title="Add space before paragraph" />
          <mu-menu-item title="Add space after paragraph" />
          <mu-menu-item title="Custom spacing..." />
        </mu-menu>
      </mu-paper>
      <br>

      <mu-linear-progress mode="determinate" :value="value"/>

      <br>

        <mu-checkbox label="最简单的" class="demo-checkbox"/> <br/>
        <mu-checkbox label="自定义icon" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite"/> <br/>
        <mu-checkbox label="不同的图形的icon" class="demo-checkbox" uncheckIcon="visibility_off" checkedIcon="visibility"/><br/>
        <mu-checkbox label="不可用" class="demo-checkbox" disabled/> <br/>
        <mu-checkbox label="不可用" class="demo-checkbox" disabled :value="true"/><br/>
        <mu-checkbox label="文字在左边的" class="demo-checkbox" labelLeft/><br/>
        
        <mu-switch label="开关" class="demo-switch" /><br/>
        <mu-switch label="默认为 true" v-model="toggle" class="demo-switch" /><br/>
        <mu-switch label="不可用" disabled class="demo-switch" /><br/>
        <mu-switch label="文字在左边" labelLeft class="demo-switch" />

        
        <div class="demo-step-container">
  <mu-stepper :activeStep="activeStep">
    <mu-step>
      <mu-step-label>
        选择活动地点
      </mu-step-label>
    </mu-step>
    <mu-step>
      <mu-step-label>
        创建一个群组
      </mu-step-label>
    </mu-step>
    <mu-step>
      <mu-step-label>
        宣传活动
      </mu-step-label>
    </mu-step>
  </mu-stepper>
  <div class="demo-step-content">
    <p v-if="finished">
      都完成啦!<a href="javascript:;" @click="reset">点这里</a>可以重置
    </p>
    <template v-if="!finished">
      <p>
        {{content}}
      </p>
      <div>
        <mu-flat-button class="demo-step-button" label="上一步" :disabled="activeStep === 0" @click="handlePrev"/>
        <mu-raised-button class="demo-step-button" :label="activeStep === 2 ? '完成' : '下一步'" primary @click="handleNext"/>
      </div>
    </template>
  </div>
</div>


<div>
  <mu-text-field hintText="电话号码" type="number" icon="phone"/><br/>
  <mu-text-field hintText="简介" multiLine :rows="3" :rowsMax="6" icon="comment"/><br/>
</div>


<div class="demo-picker-container">
  <mu-picker :slots="addressSlots" :visible-item-count="5" @change="addressChange" :values="address"/>
  <p>
    您选择的城市是： {{addressProvince}} {{addressCity}}
  </p>
</div> 
  </div>

  
</template>

<script>
const address = {
  '北京': ['北京'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区']
}



export default {
  data () {
    return {
      dataSource: [],
      bottomNav: 'movies',
      bottomNavColor: 'movies',
      bottomSheet: false,
      dialog: false,
      open: false,
      docked: true,
      value: 0,
      toggle: true,
      activeStep: 0,

      addressSlots: [
        {
          width: '100%',
          textAlign: 'right',
          values: Object.keys(address)
        }, {
          width: '100%',
          textAlign: 'left',
          values: ['北京']
        }
      ],
      address: ['北京', '北京'],
      addressProvince: '北京',
      addressCity: '北京'
    }
  },

  computed: {
    content () {
      let message = ''
      switch (this.activeStep) {
        case 0:
          message = '选择一个活动的地点'
          break
        case 1:
          message = '创建群组，50人左右'
          break
        case 2:
          message = '多在群里发消息宣传宣传'
          break
        default:
          message = 'fuck! 又 TM 出错了！！！'
          break
      }
      return message
    },
    finished () {
      return this.activeStep > 2
    }
  },
  methods: {
    handleInput (val) {
      this.dataSource = [
        val,
        val + val,
        val + val + val
      ]
      console.log(this.dataSource)
    },
    handleChange (val) {
      this.bottomNav = val
    },
    closeBottomSheet () {
      this.bottomSheet = false
    },
    openBottomSheet () {
      this.bottomSheet = true
    },
    openO () {
      this.dialog = true
    },
    closeC () {
      this.dialog = false
    },
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    handleNext () {
      this.activeStep++
    },
    handlePrev () {
      this.activeStep--
    },
    reset () {
      this.activeStep = 0
    },
    addressChange (value, index) {
      switch (index) {
        case 0:
          this.addressProvince = value
          const arr = address[value]
          this.addressSlots[1].values = arr
          this.addressCity = arr[0]
          break
        case 1:
          this.addressCity = value
          break
      }
      this.address = [this.addressProvince, this.addressCity]
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.value += 10
      if (this.value > 100) this.value = 0
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style>
  .demo-menu {
  display: inline-block;
  margin: 16px 32px 16px 0;
}

.demo-menu-container{
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
}
.demo-switch {
  margin-bottom: 16px;
}
.demo-step-container {
  width: 100%;
  max-width: 700px;
  margin: auto;
}

.demo-step-content {
  margin: 0  16px;
}

.demo-step-button {
  margin-top: 12px;
  margin-right: 12px;
}
</style>
