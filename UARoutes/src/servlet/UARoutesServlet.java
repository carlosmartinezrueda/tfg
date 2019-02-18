package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;

@SuppressWarnings("serial")
public class UARoutesServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
    	
      UserService userService = UserServiceFactory.getUserService();
      String thisURL = req.getRequestURI();
      resp.setContentType("text/html");
      resp.setCharacterEncoding("UTF-8");
      
      if (req.getUserPrincipal() != null) {
        String userName = req.getUserPrincipal().getName();
        
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Query q = new Query("Usuario")
        .setFilter(new FilterPredicate("clave",
                                       FilterOperator.EQUAL, userName));

        PreparedQuery pq = datastore.prepare(q);
        Entity result = pq.asSingleEntity();
      
       if(result == null){
			Entity newusuario = new Entity("Usuario");
			newusuario.setProperty("clave", userName);
			datastore.put(newusuario);
       }
       
        RequestDispatcher view = req.getRequestDispatcher("/main.jsp");
        req.setAttribute("logout", userService.createLogoutURL(thisURL));
        req.setAttribute("usuario", userName);
        view.forward(req, resp);
      } 
      else {
        RequestDispatcher view = req.getRequestDispatcher("/welcome.jsp");
        req.setAttribute("login", userService.createLoginURL(thisURL));
        view.forward(req, resp);
      }
    }
  }
