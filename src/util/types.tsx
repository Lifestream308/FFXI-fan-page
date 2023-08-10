export type comment = {
    commentMessage: string, 
    id: string,
    name: string, 
    date: Date
  }[]

export type topic = {
    title: string, 
    content: string, 
    id: string,
    author: string, 
    date: Date,
    numOfComments: number,
  }[]