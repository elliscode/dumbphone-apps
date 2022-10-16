package com.programmer08054.list_rest_service;

import java.util.Date;

public class WeatherDay {
	private Long temp = null;
	private Long high = Long.MIN_VALUE;
	private Long low = Long.MAX_VALUE;
	private String weatherName = null;
	private String weatherDescription = null;
	private Date date = null;

	public long getTemp() {
		return temp;
	}

	public long getHigh() {
		return high;
	}

	public long getLow() {
		return low;
	}

	public String getWeatherName() {
		return weatherName;
	}

	public String getWeatherDescription() {
		return weatherDescription;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		if (null == this.date) {
			this.date = date;
		}
	}

	public void setTemp(long temp) {
		if (null == this.temp) {
			this.temp = temp;
		}
	}

	public void setHigh(long high) {
		if (this.high < high) {
			this.high = high;
		}
	}

	public void setLow(long low) {
		if (this.low > low) {
			this.low = low;
		}
	}

	public void setWeatherName(String weatherName) {
		if (null == this.weatherName) {
			this.weatherName = weatherName;
		}
	}

	public void setWeatherDescription(String weatherDescription) {
		if (null == this.weatherDescription) {
			this.weatherDescription = weatherDescription;
		}
	}
}
