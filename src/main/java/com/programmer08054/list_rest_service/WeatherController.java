package com.programmer08054.list_rest_service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import freemarker.core.ParseException;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@org.springframework.stereotype.Controller
public class WeatherController {
	@RequestMapping("/weather")
	@ResponseBody
	public String getWeatherPage() {
		JsonObject weatherJson = getWeatherJson();
		JsonObject forecastJson = getForecastJson();

		// create your root object
		Map<String, Object> root = new TreeMap<>();
		root.put("weatherJson", weatherJson);
		root.put("forecastJson", forecastJson);
		List<WeatherDay> weatherDays = new ArrayList<>();
		root.put("weatherDays", weatherDays);
		List<JsonElement> elementsToParse = new ArrayList<>();
		elementsToParse.add(weatherJson);
		for (JsonElement item : forecastJson.get("list").getAsJsonArray()) {
			elementsToParse.add(item);
		}
		Map<Integer, WeatherDay> weatherMap = new TreeMap<>();
		for (JsonElement item : elementsToParse) {

			long temp = WeatherController
					.convertToFarenheit(item.getAsJsonObject().get("main").getAsJsonObject().get("temp").getAsString());
			long tempMin = WeatherController.convertToFarenheit(
					item.getAsJsonObject().get("main").getAsJsonObject().get("temp_min").getAsString());
			long tempMax = WeatherController.convertToFarenheit(
					item.getAsJsonObject().get("main").getAsJsonObject().get("temp_max").getAsString());
			JsonObject weather = null;
			if (item.getAsJsonObject().get("weather").isJsonObject()) {
				weather = item.getAsJsonObject().get("weather").getAsJsonObject();
			} else if (item.getAsJsonObject().get("weather").isJsonArray()) {
				weather = item.getAsJsonObject().get("weather").getAsJsonArray().get(0).getAsJsonObject();
			}
			String weatherName = weather.get("main").getAsString();
			String weatherDescription = weather.get("description").getAsString();
			Date time = new Date();
			try {
				if (item.getAsJsonObject().has("dt_txt")) {
					time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
							.parse(item.getAsJsonObject().get("dt_txt").getAsString());
				}
			} catch (java.text.ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			Integer dateNum = Integer.valueOf(time.getDate());
			WeatherDay weatherDay = weatherMap.get(dateNum);
			if (null == weatherDay) {
				weatherDay = new WeatherDay();
				weatherMap.put(dateNum, weatherDay);
			}
			weatherDay.setTemp(temp);
			weatherDay.setHigh(tempMax);
			weatherDay.setLow(tempMin);
			weatherDay.setDate(time);
			weatherDay.setWeatherName(weatherName);
			weatherDay.setWeatherDescription(weatherDescription);

//			String temp = item.getAsJsonObject().get("main").getAsJsonObject().get("temp").getAsString();
//			String fullTimeStamp = item.getAsJsonObject().get("dt_txt").getAsString();
//			String rawHour = fullTimeStamp.substring(fullTimeStamp.indexOf(" ") + 1, fullTimeStamp.indexOf(":"));
//			Integer hourNumber = Integer.parseInt(rawHour);
//			String hour = hourNumber.toString() + "AM";
//			if (hourNumber > 12) {
//				hour = (hourNumber - 12) + "PM";
//			} else if (hourNumber == 0) {
//				hour = "12AM";
//			} else if (hourNumber == 12) {
//				hour = "12PM";
//			}
//			timeAndTemp.put(fullTimeStamp.substring(0, fullTimeStamp.indexOf(" ")) + " " + hour,
//					convertToFarenheit(temp));
		}
		weatherDays.addAll(weatherMap.values());

		Template template = TemplateData.getInstance().getTemplate("weather-template.html");
		StringWriter writer = new StringWriter();
		try {
			template.process(root, writer);
		} catch (TemplateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return writer.toString();
	}

	public static long convertToFarenheit(String value) {
		Double kelvin = Double.parseDouble(value);
		Double farenheit = (kelvin - 273.15) * (9.0 / 5.0) + 32.0;
		return Math.round(farenheit);
	}

	public static JsonObject getWeatherJson() {
		return weatherApiGet("https://api.openweathermap.org/data/2.5/weather?q=Cherry%20Hill,US&appid=" + getKey());
	}

	public static JsonObject getForecastJson() {
		return weatherApiGet("https://api.openweathermap.org/data/2.5/forecast?q=Cherry%20Hill,US&appid=" + getKey());
	}

	private static JsonObject weatherApiGet(String urlString) {

		StringBuilder result = new StringBuilder();
		try {
			URL url = new URL(urlString);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			try (BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
				for (String line; (line = reader.readLine()) != null;) {
					result.append(line);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Gson gson = new Gson();
		return gson.fromJson(result.toString(), JsonObject.class);
	}

	private static String getKey() {
		Path path = Paths.get(System.getenv("USERPROFILE")).resolve("grocery-list").resolve("weather.key");
		String output = UUID.randomUUID().toString();
		if (!Files.exists(path)) {
			try {
				Files.createDirectories(path.getParent());
			} catch (IOException e) {
				e.printStackTrace();
			}
			try (BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {
				writer.write(output);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
			output = reader.readLine();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return output;
	}
}
