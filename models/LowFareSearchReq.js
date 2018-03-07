module.exports = {
  LowFareSearchReq:{
  		$attributes:{
  			SolutionResult:'true',
  			TargetBranch:'PROVISIONED_BRANCH_ID',
  			TraceId:'unique_trace_key'
  		},
      	BillingPointOfSaleInfo:{
         $attributes:{
         	OriginApplication:'UAPI'
         	}
        },
      SearchAirLeg: {
         SearchOrigin: {
            Airport: {
            	$attributes:{
               		Code: ''
           		}
            }
         },
         SearchDestination: {
            Airport: {
            	$attributes:{
               		Code: ''
           		}
            }
         },
         SearchDepTime: {
         	$attributes:{
            	PreferredTime: ''
        	}
         }
      },
      AirSearchModifiers: {
         PreferredProviders: {
            Provider: {
            	$attributes:{
               		Code: ''
           		}
            }
         }
      },
      SearchPassenger: {
      		$attributes:{
         		Code: ''
     		}
      }
    }
  }