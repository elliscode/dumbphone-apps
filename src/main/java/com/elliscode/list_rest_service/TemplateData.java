package com.elliscode.list_rest_service;

import java.io.IOException;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateExceptionHandler;
import freemarker.template.TemplateNotFoundException;

public class TemplateData {
	private static TemplateData instance = null;

	public static synchronized TemplateData getInstance() {
		if (null == instance) {
			instance = new TemplateData();
		}
		return instance;
	}

	private Configuration cfg = null;

	public Template getTemplate(String templateName) {
		if (null == cfg) {
			// https://freemarker.apache.org/docs/pgui_quickstart_createconfiguration.html

			// Create your Configuration instance, and specify if up to what FreeMarker
			// version (here 2.3.29) do you want to apply the fixes that are not 100%
			// backward-compatible. See the Configuration JavaDoc for details.
			cfg = new Configuration(Configuration.VERSION_2_3_29);

			// Specify the source where the template files come from. Here I set a
			// plain directory for it, but non-file-system sources are possible too:
			cfg.setClassForTemplateLoading(Main.class, "/freemarker-templates/");

			// From here we will set the settings recommended for new projects. These
			// aren't the defaults for backward compatibilty.

			// Set the preferred charset template files are stored in. UTF-8 is
			// a good choice in most applications:
			cfg.setDefaultEncoding("UTF-8");

			// Sets how errors will appear.
			// During web page *development* TemplateExceptionHandler.HTML_DEBUG_HANDLER is
			// better.
			cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);

			// Don't log exceptions inside FreeMarker that it will thrown at you anyway:
			cfg.setLogTemplateExceptions(false);

			// Wrap unchecked exceptions thrown during template processing into
			// TemplateException-s:
			cfg.setWrapUncheckedExceptions(true);

			// Do not fall back to higher scopes when reading a null loop variable:
			cfg.setFallbackOnNullLoopVariable(false);

		}
		try {
			return cfg.getTemplate(templateName);
		} catch (TemplateNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MalformedTemplateNameException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
