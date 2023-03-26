import { useState, useCallback } from 'react'

const useFilterableData = () => {
const [q, setQ] = useState("");
const [ searchParam ] = useState(['group','brand','mfo'])
const [ filterParam, setFilterParam ] = useState('All')

const search = useCallback(
  elems => {
    return elems.filter(elem => {
      if(elem.group === filterParam || filterParam === "All"){
        return searchParam.some(newElem => {
          return (
            elem[newElem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
            // .includes(q.toLowerCase())
          )
        })
      }
      return ''
    })
  }, [filterParam, q, searchParam]
)
  return { search, q, setQ, filterParam, setFilterParam, searchParam }
}

// function search(items) {
//   return items.filter((item) => {
//   if (item.region == filterParam) {
//       return searchParam.some((newItem) => {
//         return (
//           item[newItem]
//               .toString()
//               .toLowerCase()
//               .indexOf(q.toLowerCase()) > -1
//                    );
//                });
//            } else if (filterParam == "All") {
//                return searchParam.some((newItem) => {
//                    return (
//                        item[newItem]
//                            .toString()
//                            .toLowerCase()
//                            .indexOf(q.toLowerCase()) > -1
//                    );
//                });
//            }
//        });
//    }

export default useFilterableData