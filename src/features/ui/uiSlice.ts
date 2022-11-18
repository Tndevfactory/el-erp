import { createSlice } from "@reduxjs/toolkit";
const menu = [
  {
    "id": 1,
    "designation_fr": "GRH",
    "designation_ar": null,
    "ordre": 1,
    "menu_parant": null,
    "active": 1,
    "link": "/home",
    "created_at": null,
    "updated_at": null,
    "deleted_at": null,
    "child_recursive": [
      {
        "id": 2,
        "icon":"congesIcon",
        "designation_fr": "Gestion des congés",
        "designation_ar": null,
        "ordre": null,
        "menu_parant": 1,
        "active": 1,
        "link": null,
        "created_at": null,
        "updated_at": null,
        "deleted_at": null,
        "child_recursive": [
          {
            "id": 3,
            "designation_fr": "Mes congés",
            "designation_ar": null,
            "ordre": null,
            "menu_parant": 2,
            "active": 1,
            "link": null,
            "created_at": null,
            "updated_at": null,
            "deleted_at": null,
            "child_recursive": []
          },
          {
            "id": 4,
            "designation_fr": "List des congé",
            "designation_ar": null,
            "ordre": null,
            "menu_parant": 2,
            "active": 1,
            "link": null,
            "created_at": null,
            "updated_at": null,
            "deleted_at": null,
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "designation_fr": "Projet",
    "designation_ar": null,
    "ordre": 1,
    "menu_parant": null,
    "active": 1,
    "link": "/projects",
    "created_at": null,
    "updated_at": null,
    "deleted_at": null,
    "child_recursive": [
      {
        "id": 10,
        "designation_fr": "Gestion de projet",
        "icon":"projetIcon",
        "designation_ar": null,
        "ordre": null,
        "menu_parant": 2,
        "active": 1,
        "link": "/projects",
        "created_at": null,
        "updated_at": null,
        "deleted_at": null,
        "child_recursive": []
      },
      {
        "id": 12,
        "icon":"timesheetIcon",
        "designation_fr": "Timesheet",
        "designation_ar": null,
        "ordre": null,
        "menu_parant": 2,
        "active": 1,
        "link": "/projects/Timesheet",
        "created_at": null,
        "updated_at": null,
        "deleted_at": null,
        "child_recursive": []
      }
    ]
  },
  {
    "id": 3,
    "designation_fr": "Finance",
    "designation_ar": null,
    "ordre": 1,
    "menu_parant": null,
    "active": 1,
    "link": "/finance",
    "created_at": null,
    "updated_at": null,
    "deleted_at": null,
    "child_recursive": [
      {
        "id": 14,
        "icon":"cautionsIcon",
        "designation_fr": "Cautions",
        "designation_ar": null,
        "ordre": null,
        "menu_parant": 3,
        "active": 1,
        "link": "/finance/cautions",
        "created_at": null,
        "updated_at": null,
        "deleted_at": null,
        "child_recursive": []
      },
    ]
  }
  
]
export interface MenuRecursive {
  id: number;
  designation_fr: string;
  designation_ar?: any;
  ordre?: any;
  menu_parant: number;
  active: number;
  link?: string;
  created_at?: any;
  updated_at?: any;
  deleted_at?: any;
  // child_recursive: MenuRecursive[];
}

interface UiState {
  menu:MenuRecursive[];
  selectedModule:number;
  isCollapsed: boolean;
  isVisibleDrawer: boolean;
  lang: "ar" | "fr" | "en";
}
const initialState = {
  menu: menu,
  selectedModule:1,
  isCollapsed: false,
  isVisibleDrawer: false,
  lang: "ar",
} as UiState;

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    collapseLayer: (state, action) => {
      state.isCollapsed = true;
    },
    toggleCollapseLayout: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    uncollapseLayer: (state, action) => {
      state.isCollapsed = false;
    },
    showDrawer: (state) => {
      state.isVisibleDrawer = true;
    },
    closeDrawer: (state) => {
      state.isVisibleDrawer = false;
    },
    selectModule:(state, action)=>{
      state.selectedModule=parseInt(action.payload.moduleId)
    }
  },
});

export const {
  collapseLayer,
  uncollapseLayer,
  toggleCollapseLayout,
  showDrawer,
  closeDrawer,
  selectModule
} = uiSlice.actions;

export default uiSlice.reducer;
