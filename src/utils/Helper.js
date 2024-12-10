//  // Function to fetch and log browser metadata
//  function getBrowserMetadata() {
//     let  tempObj = {}
//     const userAgentData = navigator.userAgentData
//     tempObj.mobile = userAgentData?.mobile
//     tempObj.platform = userAgentData?.platform
//     userAgentData.brands.map(ele => {
//       tempObj[ele.brand] = ele.version
//     })
//     navigator.userAgentData.getHighEntropyValues([
//       'architecture', // The CPU architecture of the device (e.g., "arm", "x86").
//       'bitness',      // The number of bits used by the device's processor (e.g., "64").
//       'model',        // The specific model of the device (e.g., "Pixel 5").
//       'platform',     // The operating system or platform (e.g., "Windows", "Android").
//       'platformVersion', // The version of the operating system (e.g., "10.0", "14.1").
//       'uaFullVersion',   // The full version of the user agent (e.g., "114.0.5735.198").
//       'wow64'          // Whether the device is running a 32-bit app on a 64-bit OS (true or false).
//     ]
//     ).then((data) => {
//       tempObj.architecture = data.architecture // Outputs the device model, e.g., "Nexus 5"
//       tempObj.bitness = data.bitness
//       tempObj.model = data.model
//       tempObj.platform = data.platform
//       tempObj.platformVersion = data.platformVersion
//       tempObj.uaFullVersion = data.uaFullVersion
//       tempObj.wow64 = data.wow64
      
//     });
//     const dateTimeObj = Intl.DateTimeFormat().resolvedOptions()
//     tempObj = {...tempObj, ...dateTimeObj}
//     tempObj.user_agent = navigator?.userAgent
//     tempObj.languages = navigator?.languages.join(", ")
//     tempObj.online = navigator?.onLine
//     tempObj.platform = navigator?.platform
//     tempObj.vendor = navigator?.vendor
//     tempObj.hardware_concurrency = navigator?.hardwareConcurrency
//     tempObj.device_memory = navigator?.deviceMemory || "Not supported";
//     tempObj.app_name = navigator?.appName
//     tempObj.app_version = navigator?.appVersion
//     tempObj.cookie_enabled = navigator?.cookieEnabled 
//     tempObj.do_not_track = navigator?.doNotTrack //
//     tempObj.max_touch_points = navigator?.maxTouchPoints
//     const media_devices = navigator?.mediaDevices.getSupportedConstraints()
//     tempObj = {...tempObj, ...media_devices}
//     tempObj.pdf_viewer_enabled = navigator?.pdfViewerEnabled
//     tempObj.user_activation_has_been_actived = navigator?.userActivation.hasBeenActive
//     tempObj.user_activation_is_active = navigator?.userActivation.isActive
//     tempObj.webdriver = navigator?.webdriver
//     tempObj.java_enabled = navigator.javaEnabled()
    
//     return tempObj
//   }
  
//   // Function to fetch and log screen metadata
//   function getScreenMetadata() {
//     const tempObj = {}
//     tempObj.screen_width = screen.width
//     tempObj.screen_height = screen.height
//     tempObj.available_screen_width = screen.availWidth
//     tempObj.available_screen_height = screen.availHeight
//     tempObj.color_depth = screen.colorDepth
//     tempObj.pixel_depth = screen.pixelDepth
//     tempObj.device_pixel_ratio = window.devicePixelRatio
//     return tempObj
//   }
  
//   // Function to fetch and log location metadata
//   function getLocationMetadata() {
//     const tempObj = {}
//     tempObj.current_url = location.href
//     tempObj.protocol = location.protocol
//     tempObj.host = location.host
//     tempObj.hostname = location.hostname
//     tempObj.port = location.port
//     tempObj.pathname = location.pathname
//     tempObj.origin = location.origin
//     return tempObj
//   }
  
//   // Function to fetch and log network metadata
//   function getNetworkMetadata() {
//     const tempObj = {}
//     console.log("\n=== Network Metadata ===");
//     if ('connection' in navigator) {
//       const connection = navigator?.connection;
//       tempObj.effective_type = connection.effectiveType
//       tempObj.data_saver_mode = connection.saveData
//     } else {
//       console.log("Network Information API not supported.");
//     }
//     return tempObj
//   }

//   export {
//     getBrowserMetadata,
//     getScreenMetadata,
//     getLocationMetadata,
//     getNetworkMetadata
//   }
