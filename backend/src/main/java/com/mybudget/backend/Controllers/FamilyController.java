package com.mybudget.backend.Controllers;

import com.mybudget.backend.DTOs.*;
import com.mybudget.backend.Entities.Family;
import com.mybudget.backend.Services.FamilyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/family")
public class FamilyController {

    private FamilyService familyService;

    public FamilyController(FamilyService familyService) {
        this.familyService = familyService;
    }

    @PostMapping
    public ResponseEntity<CreateFamilyResponseDTO> createFamily(@RequestBody CreateFamilyDTO createFamilyDTO) {
        var familyId = familyService.createFamily(createFamilyDTO);

        var responseDTO = new CreateFamilyResponseDTO(familyId);

        return ResponseEntity.created(URI.create("/v1/family/" + familyId)).body(responseDTO);
    }

    @PutMapping("/{familyId}")
    public ResponseEntity<Void> editFamily(@PathVariable("familyId") String id, @RequestBody EditFamilyDTO editFamilyDTO) {
        familyService.editFamily(UUID.fromString(id), editFamilyDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{familyId}")
    public ResponseEntity<GetFamilyDTO> getFamilyById(@PathVariable("familyId") String id) {
        var family = familyService.getFamilyById(UUID.fromString(id));

        var responseDTO = new GetFamilyDTO(family);
        return ResponseEntity.ok(responseDTO);

    }

    @GetMapping
    public ResponseEntity<List<GetFamilyDTO>> getAllFamilies() {
        var families = familyService.getAll();

        List<GetFamilyDTO> familiesList = new ArrayList<>();

        for (Family family : families) {
            familiesList.add(new GetFamilyDTO(family));
        }

        return ResponseEntity.ok(familiesList);
    }

    @GetMapping("/check/{family_name}")
    public ResponseEntity<GetFamilyDTO> getFamilyByName(@PathVariable("family_name") String familyName) {
        var family = familyService.getFamilyByName(familyName);

        var responseDTO = new GetFamilyDTO(family);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/month-spents/{familyId}")
    public ResponseEntity<List<MonthlySpentsDTO>> getFamilyMonthlySpents(@PathVariable("familyId") String id) {
        var list = familyService.getFamilyMonthlySpents(UUID.fromString(id));

        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{familyId}")
    public ResponseEntity<Void> deleteFamilyById(@PathVariable("familyId") String id) {
        familyService.deleteFamilyById(UUID.fromString(id));
        return ResponseEntity.ok().build();
    }
}
