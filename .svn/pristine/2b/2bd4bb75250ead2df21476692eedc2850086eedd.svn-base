//package kr.or.ddit.components.stock.web;
//
//import java.io.IOException;
//import java.net.URI;
//import java.net.URISyntaxException;
//import java.text.ParseException;
//
//import javax.websocket.Session;
//
//import org.json.simple.parser.JSONParser;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import kong.unirest.json.JSONObject;
//
//@RestController
//@RequestMapping("/coin")
//public class CoinController {
//
//	@PostMapping("/getList")
//	public void AlertUser() {
//        Alert alert = alertRepository.findAll().get(0);
//        double SetPrice = alert.getPrice();
//       JSONParser jsonParser = new JSONParser();
//
//       final NotificationRequest build = NotificationRequest.builder()
//               .title("bitcoin alert")
//               .message(SetPrice + "broke down")
//               .token(notificationService.getToken(userDetailService.returnUser().getEmail()))
//               .build();
//
//       try {
//           final WebsocketClientEndpoint clientEndPoint = new WebsocketClientEndpoint();
//
//           Session session = clientEndPoint.connect(new URI("wss://ws.coincap.io/prices?assets=bitcoin"));
//
//           WebsocketClientEndpoint.MessageHandler handler = new WebsocketClientEndpoint.MessageHandler() {
//               public void handleMessage(String message) throws ParseException, IOException {
//                   Object obj = jsonParser.parse(message);
//
//                   JSONObject jsonObject = (JSONObject) obj;
//
//                   double price = Double.parseDouble(jsonObject.get("bitcoin").toString());
//                   System.out.println(price);
//
//                   if (price < SetPrice) {
//                       System.out.println("끝");
//                       notificationService.sendNotification(build);
//                       session.close();
//                   }
//
//                   try {
//                       Thread.sleep(1000);
//                   } catch (InterruptedException ex) {
//                       System.err.println("InterruptedException exception: " + ex.getMessage());
//                   }
//               }
//           };
//
//           clientEndPoint.addMessageHandler(handler);
//
//       } catch (URISyntaxException ex) {
//           System.err.println("URISyntaxException exception: " + ex.getMessage());
//       }
//   }
//	
//}
