export const flatten = (arr, parent) =>{
  return arr ? arr.reduce((result, item) => [
      ...result,
      {
          path: `${parent ? parent + '/' : ''}${item.getName()}`,
          type: item.model.type,
          id: item.model.id
      },
      ...flatten(item.children, `${parent ? parent + '/' : ''}${item.getName()}`)
  ], []) : [];
}