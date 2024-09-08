// Merging slices here in order to use them

import { create } from 'zustand'

// Devtools for debugging with redux browser extension, 
// subscribeWithSelector to update value on state change, 
// persist to sync and save/persist all state changes on refresh or otherwise
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

// immer middleware to handle updating the nested and complex objects
import { immer } from 'zustand/middleware/immer'

import { createUserSlice } from '@/store/user-slice'
import { Store } from '@/types/store'

import { createCartSlice } from './cart-slice'

export const useStore = create<Store>()(
	devtools(
		persist(
			subscribeWithSelector(
				immer((...a) => ({
					...createUserSlice(...a),
					...createCartSlice(...a),
				}))
			),
			{
				name: 'local-storage',
			}
		)
	)
)
