import { COUNTER_CHANGE } from '../constant';
export function changeCount(count) {
  //  console.log('ACTION COUNTT', count)
return {type: COUNTER_CHANGE,payload: count}
}