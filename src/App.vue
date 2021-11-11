<template>
  <div class="text-center headline mb-10">
    <div class="layout wrap align-center justify-center">
      <div xs12 class="grid gap-4 md:grid-cols-2 lg:grid-cols-4  pt-5">
        <div class="mx-auto">
          <!-- //- Date picker. -->
          <vue-cal class="vuecal--date-picker demo xsmall" style="width: 300px;height: 300px"
            :selected-date="selectedDate"
            hide-view-selector
            :time="false"
            :transitions="false"
            active-view="month"
            :disable-views="['week', 'day']"
            @cell-click="selectedDate = $event"
          />     
        </div>
        <div class="flex mx-auto" style="width: 1000px">
          <!-- //- Full-power calendar. -->
          <vue-cal class="demo full-cal vuecal--full-height-delete" style="height: 600px"
            hide-weekends
            :disable-views="['years', 'year']"
            :selected-date="selectedDate"
            :time-from="8 * 60"
            :time-to="24 * 60"
            :split-days="demoExample.splits"
            sticky-split-labels
            :editable-events="demoExample.editable"
            :events="demoExample.events"
            @cell-focus="selectedDate = $event.date || $event"
            :on-event-click="onEventClick"
          >
            <template v-slot:split-label="{ split }">
              <!-- view: current view mode -->
              <!-- //- v-icon(:color="split.color" size="20") person -->
              <a></a>
              <strong :style="`color: ${split.color};text-decoration: underline`"> {{ split.label }}</strong>
            </template>
          </vue-cal>
        </div>
      </div>
    </div>

    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="showModal">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="">
              <div class="mx-auto text-center">
                <h1 class="font-bold text-lg">Edit Event</h1>
              </div>
              <div class="text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div class="mx-auto text-center">
                  <div class="rounded-md shadow-sm -space-y-px">
                    <div class="py-3">
                      <label for="email-address" class="sr-only">Event title</label>
                      <input id="email-address" v-model="selectedEvent.title" name="email" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Event title">
                    </div>
                    <div class="py-3">
                      <label for="password" class="sr-only">Event content</label>
                      <textarea id="password" v-model="selectedEvent.content" name="password" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Event note"></textarea>
                    </div>
                    <div class="py-3">
                      <label for="start-address" class="sr-only">Event start</label>
                      <input id="start-address" readonly v-model="selectedEvent.start" name="start" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Start time">
                    </div>
                    <div class="py-3">
                      <label for="end" class="sr-only">Event end</label>
                      <input id="end" readonly v-model="selectedEvent.end" name="end" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="End time">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center">
            <button  @click="saveEvent" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
              Save
            </button>
            <button @click="cancelEvent" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/drag-and-drop.js'
const demoExample = {
  splits: [{ label: 'John', class: 'john' }, { label: 'Kate', class: 'kate' }, { label: 'Healer', class: 'healer' }],
  // danh sach nguoi can gap trong ngay
  editable: { title: false, drag: true, resize: true, create: true, delete: false },
  events: []
}

export default {
  components: { VueCal },
  name: 'App',
  props: {
    msg: String
  },
  data() {
    return {
      demoExample,
      selectedDate: new Date(),
      selectedEvent: {},
      showModal: false
    }
  },
  computed: {
    // Get the Monday of the real time current week.
    previousFirstDayOfWeek () {
      return new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7))
    }
  },
  created () {
    // Place all the events in the real time current week.
    for (let i = 0; i < 5; i++) {
      const day = this.previousFirstDayOfWeek.addDays(i).format()
      this.demoExample.events.push(
        {
          start: `${day} 12:00`,
          end: `${day} 13:00`,
          title: 'LUNCH',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          split: 1
        },
        {
          start: `${day} 12:00`,
          end: `${day} 13:00`,
          title: 'LUNCH',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          split: 2
        },
        {
          start: `${day} 14:00`,
          end: `${day} 15:00`,
          title: 'LUNCH',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          split: 3
        }
      )
    }
    // Date.format() and Date.addDays() are helper methods added by Vue Cal.
    const monday = this.previousFirstDayOfWeek.format()
    const tuesday = this.previousFirstDayOfWeek.addDays(1).format()
    const thursday = this.previousFirstDayOfWeek.addDays(3).format()
    const friday = this.previousFirstDayOfWeek.addDays(4).format()
    this.demoExample.events.push(
      {
        start: `${monday} 15:30`,
        end: `${monday} 17:30`,
        title: 'Tennis',
        subtitle: 'dâd',
        content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`,
        resizable: false,
        split: 1
      },
      {
        start: `${monday} 15:30`,
        end: `${monday} 17:30`,
        title: 'Tennis',
        content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`,
        resizable: false,
        subtitle: 'dâd',
        split: 2
      },
      {
        start: `${tuesday} 08:00`,
        end: `${tuesday} 10:00`,
        title: 'Volleyball',
        content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`,
        resizable: false,
        split: 2,
        subtitle: 'dâd',
      },
      {
        start: `${thursday} 09:00`,
        end: `${thursday} 11:30`,
        title: 'Golf',
        content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`,
        resizable: false,
        split: 1,
        subtitle: 'dâd',
      },
      {
        start: `${friday} 16:45`,
        end: `${friday} 18:45`,
        title: 'Movie',
        content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`,
        resizable: false,
        split: 2,
        subtitle: 'dâd',
      },
      {
        start: `${friday} 12:45`,
        end: `${friday} 14:25`,
        title: 'code',
        content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`,
        resizable: false,
        split: 3,
        subtitle: 'dâd'
      }
    )
  },
  methods: {
    onEventClick(event, e) {
      // console.log(event)
      console.log(e);
      console.log(event.start)
      this.selectedEvent = event;
      this.showModal = true
    },
    editEvent() {
      this.selectedEvent.title = 'title da chinh sua';
    },
    saveEvent() {
      this.showModal = false
    },
    cancelEvent() {
      this.selectedEvent = {}
      this.showModal = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h3 {
    margin: 40px 0 0;
  }

 #app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 60px;
  }

  $john: #42b983;
  $kate: #ff7fc8;
  .demo {
    border-radius: 4px;
    // Date picker.
    &.vuecal--date-picker .vuecal__cell-events-count {
      width: 4px;
      height: 4px;
      min-width: 0;
      padding: 0;
      margin-top: 4px;
      color: transparent;
      background-color: $john;
    }
    &.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {background-color: #fff;}
    // Both calendars.
    .vuecal__cell--out-of-scope {color: rgba(0, 0, 0, 0.15);}
    // Full power calendar.
    &.full-cal .vuecal__menu {background-color: transparent;}
    &.full-cal .vuecal__title-bar {background: rgba(0, 0, 0, 0.03);}
    .vuecal__view-btn {
      background: none;
      padding: 0 10px;
      margin: 4px 2px;
      border-radius: 30px;
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      text-transform: uppercase;
      border: none;
      color: inherit;
      &--active {
        background: rgb(66, 185, 130);
        color: #fff;
      }
    }
    &.full-cal .weekday-label {opacity: 0.4;font-weight: 500;}
    .vuecal__header .v-icon {color: inherit;}
    &:not(.vuecal--day-view) .vuecal__cell--selected {background-color: transparent;}
    &:not(.vuecal--day-view).full-cal .vuecal__cell--selected:before {border: 1px solid rgba($john, 0.8);}
    .vuecal__event-time {
      margin: 3px 0;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.2;
    }
    // John.
    .vuecal__header .john {color: darken($john, 5);}
    .vuecal__body .john {background-color: rgba($john, 0.08);}
    .john .vuecal__event {background-color: rgba(lighten($john, 5), 0.85);color: #fff;}
    .john .lunch {
      background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($john, 0.15) 10px, rgba($john, 0.15) 20px);
      color: transparentize(darken($john, 10), 0.4);
    }
    // Kate.
    .vuecal__header .kate {color: darken($kate, 5);}
    .vuecal__body .kate {background-color: rgba($kate, 0.08);}
    .kate .vuecal__event {background-color: rgba(lighten($kate, 5), 0.85);color: #fff;}
    .kate .lunch {
      background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($kate, 0.15) 10px, rgba($kate, 0.15) 20px);
      color: transparentize(darken($kate, 10), 0.4);
    }
  }
  .vuecal__event-content {
      svg {
        margin: auto;
      }
    }
</style>

