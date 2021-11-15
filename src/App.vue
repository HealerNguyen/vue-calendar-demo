<template>
  <div class="text-center headline mb-10">
    <div class="container mx-auto bg-tab-header inline-block px-5">
      <div class="float-left">
        <ul class="flex justify-center items-center">
          <template v-for="(tab, index) in tabs">
            <li class="cursor-pointer text-white border-b-4 border-b-transparent mx-5 py-1.5"
              :key="index"
              :class="activeTab===index ? 'border-b-active border-b-4' : ''" @click="activeTab = index">
              {{tab}}
            </li>
          </template>
        </ul>
      </div>
      <div class="float-right">
        <ul class="flex justify-center items-center">
          <li class="cursor-pointer text-white border-b-4 border-b-transparent underline mx-2 py-1.5">
            Settings
          </li>
        </ul>
      </div>
    </div>
    <div class="container mx-auto align-center justify-center h-full">
      <div xs12 class="grid gap-4 grid-cols-4 pt-5">
        <div class="mx-auto h-full border w-full">
          <!-- //- Date picker. -->
          <div class="p-4">
            <vue-cal
              class="vuecal--date-picker demo"
              small
              :selected-date="selectedDate"
              hide-view-selector
              :time="false"
              :transitions="false"
              active-view="month"
              :disable-views="['week', 'day']"
              @cell-click="selectedDate = $event"
            />
          </div>
          <!-- :events="demoExample.events" -->
          <div class="py-1.5 px-4 text-left">
            <label for="email-address" class="font-medium">Title:</label>
            <input
              id="email-address"
              autocomplete="off"
              name="email"
              type="text"
              required
              class="
                appearance-none
                rounded
                relative
                block
                w-full
                px-2
                py-1.5
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Title"
            />
          </div>
          <div class="py-1.5 px-4 text-left">
            <label for="centre" class="font-medium">Centre:</label>
            <input
              id="centre"
              autocomplete="off"
              name="centre"
              type="text"
              required
              class="
                appearance-none
                rounded
                relative
                block
                w-full
                px-2
                py-1.5
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Title"
            />
          </div>
          <div class="py-1.5 px-4 text-left">
            <label for="service" class="font-medium">Service Category:</label>
            <input
              id="service"
              autocomplete="off"
              name="service"
              type="text"
              required
              class="
                appearance-none
                rounded
                relative
                block
                w-full
                px-2
                py-1.5
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Title"
            />
          </div>
          <div class="py-1.5 px-4 text-left">
            <label for="type" class="font-medium">Type:</label>
            <input
              id="type"
              autocomplete="off"
              name="type"
              type="text"
              required
              class="
                appearance-none
                rounded
                relative
                block
                w-full
                px-2
                py-1.5
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Title"
            />
          </div>
          <div class="py-1.5 px-4 text-left">
            <label for="room" class="font-medium">Room:</label>
            <input
              id="room"
              autocomplete="off"
              name="room"
              type="text"
              required
              class="
                appearance-none
                rounded
                relative
                block
                w-full
                px-2
                py-1.5
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Title"
            />
          </div>
          <div class="py-1.5 px-4 text-left">
            <label for="Therapist" class="font-medium">Therapist:</label>
            <select class="form-select block w-full mt-1">
              <option v-for="i in 10" :key="i" :selected="i == 9">Option {{i}}</option>
            </select>
          </div>
          <div class="py-1.5 px-4 text-center">
            <button class="bg-gray-300 rounded-md px-1.5 py-2">Create Appointment</button>
          </div>
        </div>
        <div class="flex mx-auto col-span-3 w-full">
          <!-- //- Full-power calendar. -->
                      <!-- hide-weekends -->
          <vue-cal
            class=" demo full-cal vuecal--full-height-delete w-full"
            :disable-views="disableViewsRight"
            :selected-date="selectedDate"
            :time-from="6 * 60"
            :time-to="24 * 60"
            :split-days="demoExample.splits"
            sticky-split-labels
            :editable-events="demoExample.editable"
            :events="demoExample.events"
            @cell-focus="selectedDate = $event.date || $event"
            :drag-to-create-event="true"
            :on-event-create="onEventCreate"
            :on-event-click="onEventClick"
            :dblclickToNavigate="false"
            :min-cell-width="minCellWith"
            :min-split-width="minSplitWidth"
            :active-view="activeView"
          >
            >
            <template v-slot:split-label="{ split }">
              <!-- view: current view mode -->
              <!-- //- v-icon(:color="split.color" size="20") person -->
              <strong
                :style="`color: ${split.color}`"
              >
                {{ split.label }}</strong
              >
            </template>
          </vue-cal>
        </div>
      </div>
    </div>

    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-if="showModal"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="
            inline-block
            align-bottom
            bg-white
            rounded-lg
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
          "
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="">
              <div class="mx-auto text-center">
                <h1 class="font-bold text-lg">Edit Event</h1>
              </div>
              <div class="text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div class="mx-auto text-center">
                  <div class="rounded-md shadow-sm -space-y-px">
                    <div class="py-3">
                      <label for="email-address" class="sr-only"
                        >Event title</label
                      >
                      <input
                        id="email-address"
                        v-model="selectedEvent.title"
                        name="email"
                        type="text"
                        required
                        class="
                          appearance-none
                          rounded
                          relative
                          block
                          w-full
                          px-3
                          py-2
                          border border-gray-300
                          placeholder-gray-500
                          text-gray-900
                          focus:outline-none
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          focus:z-10
                          sm:text-sm
                        "
                        placeholder="Event title"
                      />
                    </div>
                    <div class="py-3">
                      <label for="password" class="sr-only"
                        >Event content</label
                      >
                      <textarea
                        id="password"
                        v-model="selectedEvent.content"
                        name="password"
                        type="text"
                        required
                        class="
                          appearance-none
                          rounded
                          relative
                          block
                          w-full
                          px-3
                          py-2
                          border border-gray-300
                          placeholder-gray-500
                          text-gray-900
                          focus:outline-none
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          focus:z-10
                          sm:text-sm
                        "
                        placeholder="Event note"
                      ></textarea>
                    </div>
                    <div class="py-3 grid gap-4 md:grid-cols-2">
                      <div>
                        <label for="start-address" class="sr-only"
                        >Event start</label
                      >
                      <input
                        id="start-address"
                        v-model="selectedStartTime"
                        name="start"
                        type="date"
                        required
                        class="
                          appearance-none
                          rounded
                          relative
                          block
                          w-full
                          px-3
                          py-2
                          border border-gray-300
                          placeholder-gray-500
                          text-gray-900
                          focus:outline-none
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          focus:z-10
                          sm:text-sm
                        "
                        placeholder="Start time"
                      />
                      </div>
                      <div>
                        <label for="start-address" class="sr-only"
                        >Event start</label
                      >
                      <input
                        id="start-address"
                        v-model="startTime"
                        name="start"
                        type="time"
                        min="01:00"
                        max="23:59"
                        required
                        class="
                          appearance-none
                          rounded
                          relative
                          block
                          w-full
                          px-3
                          py-2
                          border border-gray-300
                          placeholder-gray-500
                          text-gray-900
                          focus:outline-none
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          focus:z-10
                          sm:text-sm
                        "
                        placeholder="Start time"
                      />
                      </div>
                    </div>
                    <div class="py-3 grid gap-4 md:grid-cols-2">
                      <div>
                        <label for="end" class="sr-only">Event end</label>
                        <input
                          id="end"
                          v-model="selectedEndTime"
                          name="end"
                          type="date"
                          required
                          class="
                            appearance-none
                            rounded
                            relative
                            block
                            w-full
                            px-3
                            py-2
                            border border-gray-300
                            placeholder-gray-500
                            text-gray-900
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            focus:z-10
                            sm:text-sm
                          "
                          placeholder="End time"
                        />
                      </div>
                      <div>
                        <label for="end" class="sr-only">Event end</label>
                        <input
                          id="end"
                          v-model="endTime"
                          name="end"
                          type="time"
                          required
                          min="01:00"
                          max="23:59"
                          class="
                            appearance-none
                            rounded
                            relative
                            block
                            w-full
                            px-3
                            py-2
                            border border-gray-300
                            placeholder-gray-500
                            text-gray-900
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            focus:z-10
                            sm:text-sm
                          "
                          placeholder="End time"
                        />
                      </div>
                    </div>
                    <div v-if="errorDateTime">
                      <p class="text-red font-bold">
                        {{errorDateTime}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="
              bg-gray-50
              px-4
              py-3
              sm:px-6 sm:flex sm:flex-row-reverse
              items-center
              justify-center
            "
          >
            <button
              @click="saveEvent"
              type="button"
              class="
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-transparent
                shadow-sm
                px-4
                py-2
                bg-green-600
                text-base
                font-medium
                text-white
                hover:bg-green-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-green-500
                sm:ml-3 sm:w-auto sm:text-sm
              "
            >
              Save
            </button>
            <button
              @click="cancelEvent"
              type="button"
              class="
                mt-3
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-gray-300
                shadow-sm
                px-4
                py-2
                bg-white
                text-base
                font-medium
                text-gray-700
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
                sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/drag-and-drop.js";
import { demoExample, eventsAdded, fetchData } from './data'
export default {
  components: { VueCal },
  name: "App",
  props: {
    msg: String,
  },
  data() {
    return {
      demoExample,
      selectedDate: new Date(),
      selectedEvent: {},
      showModal: false,
      minCellWith: 300,
      minSplitWidth: 150,
      selectedStartTime: '',
      selectedEndTime: '',
      startTime: '',
      endTime: '',
      errorDateTime: '',
      tabs: ['Staff Day Planner', 'Day Planner', 'Week Planner', 'Month Planner'],
      activeTab: 0,
      disableViewsRight: ['years', 'year', 'month', 'week'],
      activeView: 'day'
    };
  },
  computed: {
    // Get the Monday of the real time current week.
    previousFirstDayOfWeek() {
      return new Date(
        new Date().setDate(
          new Date().getDate() - ((new Date().getDay() + 6) % 7)
        )
      );
    },
  },
  created() {
    // Place all the events in the real time current week.
    const beforeDatas = fetchData();
    // Date.format() and Date.addDays() are helper methods added by Vue Cal.
    this.demoExample.events = [...beforeDatas, ...eventsAdded];
  },
  methods: {
    onEventClick(event) {
      // console.log(event)
      // console.log(e);
      // console.log(event.start)
      this.selectedEvent = event
      this.selectedStartTime = event.start.format('YYYY-MM-DD')
      this.selectedEndTime = event.start.format('YYYY-MM-DD')
      this.startTime = event.start.format('HH:mm')
      this.endTime = event.end.format('HH:mm')
      this.showModal = true
    },
    onEventCreate(event, deleteEventFunction) {
      event.id = this.demoExample.events.length
      this.selectedEvent = event
      this.deleteEventFunction = deleteEventFunction
      // this.demoExample.events.push(event)
      return event
    },
    saveEvent() {
      const startDateVal = new Date(`${this.selectedStartTime} ${this.startTime}:00`)
      const endDateVal = new Date(`${this.selectedEndTime} ${this.endTime}:00`)
      if (startDateVal.getTime() < endDateVal.getTime()) {
        this.selectedEvent.start = new Date(`${this.selectedStartTime} ${this.startTime}:00`)
        this.selectedEvent.end = new Date(`${this.selectedEndTime} ${this.endTime}:00`)
        // console.log(this.selectedEvent._eid)
        const index = this.demoExample.events.findIndex(
          (el) => el.id == this.selectedEvent.id
        );
        // console.log(index)
        if (index < 0) {
          this.demoExample.events.push(this.selectedEvent)
        } else {
          this.demoExample.events.splice(index,1)
          this.demoExample.events.splice(index, 0, this.selectedEvent)
        }
        this.showModal = false
      } else {
        this.errorDateTime = 'Please select correct date time!'
      }
    },
    cancelEvent() {
      if (this.deleteEventFunction) {
        this.deleteEventFunction()
        this.deleteEventFunction = ""
      }
      this.showModal = false
    },
  },
  watch: {
    activeTab(val) {
      switch(val) {
        case 0: {
          this.disableViewsRight =  ['years', 'year', 'month', 'week']
          this.activeView = 'day'
          break;
        }
        case 1: {
          this.disableViewsRight =  ['years', 'year', 'month', 'week']
          this.activeView = 'day'
          break;
        }
        case 2: {
          this.disableViewsRight =  ['years', 'year', 'month', 'day']
          this.activeView = 'week'
          break;
        }
        case 3: {
          this.disableViewsRight =  ['years', 'year', 'day', 'week']
          this.activeView = 'month'
          break;
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('./custom.scss');
// 
.bg-tab-header {
  background-color: #3c4655 !important;
}
.border-b-transparent {
  border-color: transparent;
}
.border-b-active {
  border-color: #4caf50 !important;
}
.day-split-header {
  border: 1px solid #ededed;
  border-bottom: none;
}
</style>

