export type AppraisalFormData = {
	ctn_wpc_f7_counter:string,
	saved_utm_param:string,
	ip:string,
	fpc:string,
	Meka: string,
	CarName: string,
	caryear: string,
	carversion: string,
	host?: string,
	userAgent?: string,
	requestURL?: string

};

const tgt_env = () => {

	//const environment = document.querySelector('input#ctn_e').value // pr or de
	//const target = document.querySelector('input#ctn_t').value // a
	let formIdTop_pc = "";
	let formIdTop_sp = "";
	let formIdForm = "";
	let formIdForm2 = "";
	let ep = "";
	//if (environment === "de") {
	if (import.meta.env.MODE === "development") {
		//開発環境
		formIdTop_pc = '7';
		formIdTop_sp = '10';
		formIdForm = '440';
		formIdForm2 = '23';
		ep = "https://d3hr6jxhk0c2mf.cloudfront.net" + "/api/v1/appraisal/"
	}
	else{
    // 本番環境
    formIdForm = '591';
    formIdForm2 = '1571';
    formIdTop_pc = '3573';
    formIdTop_sp = '3574';

    ep = "https://d3ul0twcmnvo72.cloudfront.net" + "/api/v1/appraisal/"
	}
	let ep_suffix = "ad";
	return {ep_suffix : ep_suffix, formIdForm : formIdForm, formIdForm2 : formIdForm2, formIdTop_pc :formIdTop_pc, formIdTop_sp : formIdTop_sp, ep : ep}
}

/**
 * appraisal_form_data registration
 * @param appraisal_form_data
 *
 */
export const  registAppraisalApi = async(appraisal_form_data:AppraisalFormData) =>{


	// URL
	const fid_env_ep = tgt_env();
	let appraisalReqUrl =  fid_env_ep.ep + "core/ad3";

	// リクエスト
	/*
	const requestOptions = (body: AppraisalFormData) => {
		return {
			method: "PUT",
			headers: new Headers({
					"Content-Type": "application/json; charset=utf-8",
							}),
			body: JSON.stringify(body),
		};
	};
	*/

	try {
		const response = await fetch(appraisalReqUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(appraisal_form_data)
		});

		if (response.ok) {
			const result = await response.json();
			localStorage.setItem('responseData', result.content);
			sessionStorage.setItem('appraisal_form_data', JSON.stringify(appraisal_form_data, null, 2));
			console.log('Data updated successfully:', result);

		} else {
			console.error('Failed to update data:', response.status);
		}
	} catch (error) {
		console.error('Error:', error);
	}


	// const appraisalRequest = async (
	// 	requestParams: AppraisalFormData,
	// ): Promise<AppraisalResponse> => {
	// 	return new Promise((resolve) => {
	// 		//fetch(appraisalReqUrl, requestOptions(requestParams))
	// 		fetch(appraisalReqUrl, {
	// 							method: "PUT",
	// 							headers: new Headers({
	// 									"Content-Type": "application/json; charset=utf-8",
	// 							}),
	// 							body: JSON.stringify(requestParams),
	// 			})
	// 		.then((response) => {
	// 				if (response.ok) {
	// 					resolve({ success: true, statusCode: response.status });
	// 				} else {
	// 					console.error("Network response was not ok");
	// 					resolve({ success: false, statusCode: response.status });
	// 				}
	// 			})
	// 			.catch((error: Error) => {
	// 				console.error("There was a problem with the fetch operation:", error);
	// 				resolve({ success: false, statusCode: 0 });
	// 			});
	// 	});
	// };
}


interface AppraisalResponse {
  success: boolean;
  statusCode: number;
}
