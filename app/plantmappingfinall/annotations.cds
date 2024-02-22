using MyService as service from '../../srv/service';

annotate service.plant with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Plant',
            Value : plant,
        },
        {
            $Type : 'UI.DataField',
            Label : 'SBG',
            Value : SBG,
        },
        {
            $Type : 'UI.DataField',
            Label : 'SBU',
            Value : SBU,
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt,
            ![@UI.Hidden],
        },
        {
            $Type : 'UI.DataField',
            Value : createdBy,
            ![@UI.Hidden],
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,
            ![@UI.Hidden],
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
            ![@UI.Hidden],
        },
    ]
);
annotate service.plant with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'plant',
                Value : plant,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SBG',
                Value : SBG,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SBU',
                Value : SBU,
            },
            {
                $Type : 'UI.DataField',
                Label : 'control_plant',
                Value : control_plant,
            },
            {
                $Type : 'UI.DataField',
                Label : 'control_SBG',
                Value : control_SBG,
            },
            {
                $Type : 'UI.DataField',
                Label : 'control_SBU',
                Value : control_SBU,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
annotate service.plant with @(
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : createdAt,
                    Descending : true,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    }
);
