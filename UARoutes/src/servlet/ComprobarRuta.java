package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

@SuppressWarnings("serial")
public class ComprobarRuta extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
    	
    	resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
	     
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	    
	    String nombreR  = req.getParameter("nombreRuta");
	     
	    Query q = new Query("Ruta")
        .setFilter(new FilterPredicate("nombre", FilterOperator.EQUAL, nombreR));
	    
	    PreparedQuery pq = datastore.prepare(q);
        Entity result = pq.asSingleEntity();
        
		if(result == null)
			resp.getWriter().print("{\"result\": {\"message\": \"No existe la ruta\"}}");
		
		else
			resp.getWriter().print("{\"error\": {\"message\": \"Ya existe esa ruta\"}}");
		
    }

}

