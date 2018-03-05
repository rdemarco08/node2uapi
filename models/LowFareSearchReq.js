module.exports = {
  LowFareSearchReq:{
  		$attributes:{
  			SolutionResult:'true',
  			TargetBranch:'',
  			TraceId:'richard_trace'
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