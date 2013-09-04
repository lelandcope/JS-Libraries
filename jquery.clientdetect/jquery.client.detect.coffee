(() ->
	BrowserDetect = 
		init: ->
			this.browser = this.searchString(this.dataBrowser) or "An unknown browser"
			this.version = this.searchVersion(navigator.userAgent) or this.searchVersion(navigator.appVersion) or "an unknown version"
			this.OS = this.searchString(this.dataOS) or "an unknown OS"
			
			this
			
		searchString: (data) ->
			for d in data
				dataString = d.string
				dataProp = d.prop
				this.versionSearchString = d.versionSearch or d.identity
				
				if dataString and dataString.indexOf(d.subString) != -1 or dataProp
					return d.identity
					
		
		searchVersion: (dataString) ->
			index = dataString.indexOf(this.versionSearchString)
			if index is -1 
				return false
			else
				return parseFloat(dataString.substring(index+this.versionSearchString.length+1))
				
		dataBrowser:
			[
				(
	                string: navigator.userAgent
	                subString: "Chrome"
	                identity: "Chrome"
	            )
	            (   string: navigator.userAgent
	                subString: "OmniWeb"
	                versionSearch: "OmniWeb/"
	                identity: "OmniWeb"
	            )
	            (
	                string: navigator.vendor
	                subString: "Apple"
	                identity: "Safari"
	                versionSearch: "Version"
	            )
	            (
	                prop: window.opera
	                identity: "Opera"
	            )
	            (
	                string: navigator.vendor
	                subString: "iCab"
	                identity: "iCab"
	            )
	            (
	                string: navigator.vendor
	                subString: "KDE"
	                identity: "Konqueror"
	            )
	            (
	                string: navigator.userAgent
	                subString: "Firefox"
	                identity: "Firefox"
	            )
	            (
	                string: navigator.vendor
	                subString: "Camino"
	                identity: "Camino"
	            )
	            (
	                string: navigator.userAgent
	                subString: "Netscape"
	                identity: "Netscape"
	            )
	            (
	                string: navigator.userAgent
	                subString: "MSIE"
	                identity: "IE"
	                versionSearch: "MSIE"
	            )
	            (
	                string: navigator.userAgent
	                subString: "Gecko"
	                identity: "Mozilla"
	                versionSearch: "rv"
	            )
	            (
	                string: navigator.userAgent
	                subString: "Mozilla"
	                identity: "Netscape"
	                versionSearch: "Mozilla"
	            )
			]
			
			
		dataOS : 
	        [
	            (
	                string: navigator.platform
	                subString: "Win"
	                identity: "Windows"
	            )
	            (
	                string: navigator.platform
	                subString: "Mac"
	                identity: "Mac"
	            )
	            (
	                string: navigator.userAgent
	                subString: "iPhone"
	                identity: "iPhone/iPod"
	            )
	            (
	                string: navigator.userAgent
	                subString: "iPad"
	                identity: "iPad"
	            )
	            (
	                string: navigator.userAgent
	                subString: "Android"
	                identity: "Android"
	            )
	            (
	                string: navigator.platform
	                subString: "Linux"
	                identity: "Linux"
	            )
	        ]
			
	
	window.$.client = 
		os: BrowserDetect.OS
        browser: BrowserDetect.browser
        version: BrowserDetect.versio
	
	BrowserDetect
)()