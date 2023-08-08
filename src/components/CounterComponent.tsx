import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../reduxSlices/testSlice'
import { switchBool, setBool } from '../reduxSlices/test2Slice'

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const showBool = useSelector((state: RootState) => state.bool.value.toString())
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>

      <div>
        <h2>{showBool}</h2>
        <button onClick={() => dispatch(switchBool())}>Switch</button>
        <br />
        <button onClick={() => dispatch(setBool(true))}>Set to True</button>
      </div>
    </div>
  )
}