const previousFirstDayOfWeek = new Date(
  new Date().setDate(
    new Date().getDate() - ((new Date().getDay() + 6) % 7)
  )
);
const monday = previousFirstDayOfWeek.format();
const tuesday = previousFirstDayOfWeek.addDays(1).format();
const thursday = previousFirstDayOfWeek.addDays(3).format();
const friday = previousFirstDayOfWeek.addDays(4).format();
export const eventsAdded = [
  {
    start: `${monday} 15:30`,
    end: `${monday} 17:30`,
    title: "Tennis",
    subtitle: "dâd",
    content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>`,
    resizable: false,
    split: 1,
    id: 4,
  },
  {
    start: `${monday} 15:30`,
    end: `${monday} 17:30`,
    title: "Tennis",
    content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>`,
    resizable: false,
    subtitle: "dâd",
    split: 2,
    id: 5,
  },
  {
    start: `${tuesday} 08:00`,
    end: `${tuesday} 10:00`,
    title: "Volleyball",
    content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>`,
    resizable: false,
    split: 2,
    subtitle: "dâd",
    id: 6,
  },
  {
    start: `${thursday} 09:00`,
    end: `${thursday} 11:30`,
    title: "Golf",
    content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>`,
    resizable: false,
    split: 1,
    subtitle: "dâd",
    id: 6,
  },
  {
    start: `${friday} 16:45`,
    end: `${friday} 18:45`,
    title: "Movie",
    content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>`,
    resizable: false,
    split: 2,
    subtitle: "dâd",
    id: 7,
  },
  {
    start: `${friday} 16:45`,
    end: `${friday} 18:25`,
    title: "code",
    content: `<svg class="mx-auto h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>`,
    resizable: false,
    split: 3,
    subtitle: "dâd",
    id: 8,
  }
];

export const demoExample = {
  splits: [
    { label: "John", class: "john" },
    { label: "Kate", class: "kate" },
    { label: "Healer", class: "healer" },
  ],
  // list person in day
  editable: {
    title: false,
    drag: true,
    resize: true,
    create: true,
    delete: false,
  },
  events: [],
};


export const fetchData = () => {
  let someData = [];
  for (let i = 0; i < 5; i++) {
    const day = previousFirstDayOfWeek.addDays(i).format();
    someData.push(
      {
        start: `${day} 12:00`,
        end: `${day} 13:00`,
        title: "LUNCH",
        class: "lunch",
        background: true,
        deletable: false,
        resizable: false,
        split: 1,
        id: 1,
      },
      {
        start: `${day} 12:00`,
        end: `${day} 13:00`,
        title: "LUNCH",
        class: "lunch",
        background: true,
        deletable: false,
        resizable: false,
        split: 2,
        id: 2,
      },
      {
        start: `${day} 14:00`,
        end: `${day} 15:00`,
        title: "LUNCH",
        class: "lunch",
        background: true,
        deletable: false,
        resizable: false,
        split: 3,
        id: 3,
      }
    );
  }
  return someData;
}