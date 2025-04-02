import dayjs from "dayjs"

module.exports = function(){

    const currentDate = dayjs(new Date()).format('MM/DD/YYYY')
    const futureDate = dayjs().add(30, 'days').format('MM/DD/YYYY')

    console.log("currentDate", currentDate)
    console.log("futureDate", futureDate)


    return {
        "commonvalidationData": {
          "searchbarElement": "TRM Versions",
          "breadcumElement": "TRM Versions",
          "addbreadcum": "Add TRM Version",
          "error": "Please fill all mandatory fields"
        },
        "trmvalidationdata": [
          {
            "Name": "",
            "Authority": "",
            "Effective From": "03/04/2025",
            "Effective Until": "03/04/2023",
            "Description": "",
            "error": "Effective until date should be greater than or equal to Effective from date."
          },
          {
            "Name": "",
            "Authority": "",
            "Effective From": currentDate,
            "Effective Until": futureDate,
            "error": "TRM Version saved successfully."
          }
        ]
      }
}