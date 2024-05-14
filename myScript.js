document.addEventListener("DOMContentLoaded", (event) => {

    const gender = document.getElementById("gender");
    const maritalStatus = document.getElementById("marital_status");
    const occupation = document.getElementById("occupation");
    const monthlyIncome = document.getElementById("monthly_income");
    const educationalQualifications = document.getElementById("education");
    const feedback = document.getElementById("feedback");
    const age = document.getElementById("age");
    const familySize = document.getElementById("family_size");
    const latitude = document.getElementById("latitude");
    const longitude = document.getElementById("longitude");
    const postalCode = document.getElementById("postal_code");
    const submitButton = document.querySelector(".sumbit-button button");
    const resultLabel = document.querySelector(".prediction-result");
    const apiEndpoint = "https://food-data-model.onrender.com/predict";
    dataFromApi = "";

    apiPostData =
        [
            {
                "Age": 26,
                "Gender": "Male",
                "Marital Status": "Single",
                "Occupation": "Student",
                "Monthly Income": "No Income",
                "Educational Qualifications": "Post Graduate",
                "Family size": 4,
                "latitude": 13.0019,
                "longitude": 77.5713,
                "Pin code": 560003,
                "Feedback": "Positive"
            }
        ]

    async function getApiData() {

        apiPostData[0]["Age"] = Number(age.value);
        apiPostData[0]["Feedback"] = feedback.value;
        apiPostData[0]["Pin code"] = Number(postalCode.value);
        apiPostData[0]["longitude"] = parseFloat(longitude.value);
        apiPostData[0]["latitude"] = parseFloat(latitude.value);
        apiPostData[0]["Family size"] = Number(familySize.value);
        apiPostData[0]["Educational Qualifications"] = educationalQualifications.value;
        apiPostData[0]["Monthly Income"] = monthlyIncome.value;
        apiPostData[0]["Occupation"] = occupation.value;
        apiPostData[0]["Marital Status"] = maritalStatus.value;
        apiPostData[0]["Gender"] = gender.value;



        await fetch(apiEndpoint, {
            method: "POST",
            body: JSON.stringify(apiPostData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        )
            .then((response) => response.json())
            .then((json) => dataFromApi = json)

        dataFromApi = dataFromApi["Prediction: "][0];

        if (dataFromApi == 'Yes') {
            resultLabel.innerHTML = "Your client is unlikely to cancel this order";
        }
        else if (dataFromApi == 'No') {
            resultLabel.innerHTML = "Your client is likely to cancel this order";
        }
        else {
            resultLabel.innerHTML = "something wrong...";
        }



    }

    submitButton.addEventListener("click", () => {

        getApiData();

    });


});