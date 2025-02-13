package kr.or.ddit.components.facechat.web;

import java.util.Iterator;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import kr.or.ddit.components.facechat.service.IFaceChatService;
import kr.or.ddit.components.facechat.vo.FaceChatVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/facechat")
public class FaceChatController {

	@Inject
	private IFaceChatService service;
	
	// 방 만들기
	@PostMapping("/room")
	public FaceChatVO grmRoomOpen(@RequestBody Map<String, Map<String, String>> map){
		
		
		Map<String, String> infoMap = map.get("info");
		Map<String, String> queryMap = map.get("queryMap");
		
		String[] roomTitle = queryMap.get("roomTitle").split(",");
		
		if(service.isTitleExist(roomTitle[0]) > 0) {
			return null;
		}
		
		// 바디에 보낼 쿼리스트링을 만든다.
		String query = "";
		Iterator<String> it = queryMap.keySet().iterator();
		while(it.hasNext()) {
			String key = it.next();
			if(key.equals("maxJoinCount")) {
				continue;
			}
			// 특수문자를 변환한다.
			if(queryMap.get(key).contains(" ")) {
				queryMap.put(key, queryMap.get(key).replaceAll(" ", "%20"));
				queryMap.put(key, queryMap.get(key).replaceAll(":", "%3A"));
				queryMap.put(key, queryMap.get(key).replace("+", "%2B"));
			}
			query += "&" + key + "=" + queryMap.get(key);
		}
		// Konghq Unirest
		HttpResponse<String> response = Unirest.post("https://openapi.gooroomee.com/api/v1/room")
				  .header("accept", "application/json")
				  .header("content-type", "application/x-www-form-urlencoded")
				  .header("X-GRM-AuthToken", "12056163501988613cf51b7b51cdd8140bb172761d02211a8b")
				  .body("callType=P2P&liveMode=true&maxJoinCount="+ queryMap.get("maxJoinCount") +"&liveMaxJoinCount=100&layoutType=4&sfuIncludeAll=true" + query)
				  .asString();
		
		// JSONOject를 사용해 roomId의 값을 꺼낸다.
		JSONObject jsonObject = new JSONObject(response.getBody());
		
		log.info(jsonObject.toString());
		
		String roomId = jsonObject.getJSONObject("data").getJSONObject("room").getString("roomId");
		
		// thNo유무에 따른 fcVO를 생성한다.
		FaceChatVO fcVO = new FaceChatVO();
		
		String ldEndDate = infoMap.get("endTime");
		
		if(infoMap.get("thNo") == null) {
			fcVO.setCH(Integer.parseInt(infoMap.get("chNo"))
					   , Integer.parseInt(infoMap.get("memNo"))
					   , queryMap.get("roomTitle"), queryMap.get("roomPasswd"), roomId, ldEndDate);
		} else {
			fcVO.setTH(Integer.parseInt(infoMap.get("chNo"))
					   , Integer.parseInt(infoMap.get("thNo"))
					   , Integer.parseInt(infoMap.get("memNo"))
					   , queryMap.get("roomTitle"), queryMap.get("roomPasswd"), roomId, ldEndDate);
		}
		
		// DB에 정보저장
		
		fcVO = service.create(fcVO);
		
		return fcVO; 
	}
	

	// 방 리스트 가져오기
	@PostMapping("/list")
	public PagingVO<FaceChatVO> grmRoomList(@RequestBody PagingVO<FaceChatVO> page) {

		service.getList(page);
				
		return page;
	}
	
	// 방 종료
	@GetMapping("/close/{id}")
	public ResponseEntity<String> grmRoomClose(@PathVariable String id) {
		
		System.out.println(id);
		
		HttpResponse<String> response = Unirest.delete("https://openapi.gooroomee.com/api/v1/room/" + id )
				  .header("accept", "application/json")
				  .header("X-GRM-AuthToken", "12056163501988613cf51b7b51cdd8140bb172761d02211a8b")
				  .asString();
		
		service.closeRoom(id);
		
		return new ResponseEntity<String>(response.getBody(), HttpStatus.OK);
	}
	
	// 방 이름 중복체크
	@GetMapping("/check/{title}")
	public int isTitleExist(@PathVariable String title) {
		
		int cnt = service.isTitleExist(title);
		
		return cnt;
	}
	
	@PostMapping("/enter")
	public String enter(@RequestBody FaceChatVO fcVO) {
		return service.getRoomUrlId(fcVO);
	}
	
}
