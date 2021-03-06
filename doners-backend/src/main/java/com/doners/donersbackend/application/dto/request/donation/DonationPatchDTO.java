package com.doners.donersbackend.application.dto.request.donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@ApiModel("DonationPatchDTO")
@Getter
@ToString
public class DonationPatchDTO {

    @ApiModelProperty(name = "기부 ID")
    @NotBlank
    private String donationId;

}
