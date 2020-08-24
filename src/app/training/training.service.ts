import { Subject } from 'rxjs'
import 'rxjs/add/operator/map'

import { Exercise } from './exercise.model'

export class TrainingService {
  exerciseChanged = new Subject<Exercise>()
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 3, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 13, calories: 12 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 18, calories: 19 },
    { id: 'burpees', name: 'Burpees', duration: 6, calories: 28 },
  ]
  private runningExercise: Exercise
  private exercises: Exercise[] = []

  getAvailableExercises() {
    return this.availableExercises.slice()
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    )
    this.exerciseChanged.next({ ...this.runningExercise })
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    })
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    })
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  getRunningExercise() {
   return { ...this.runningExercise }
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice()
  }

}
