import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ExampleGroupLegend } from "./example-group-legend";
import { LayerGroup, RasterLayer } from "@dlr-eoc/services-layers";


describe("ExampleGroupLegend", () => {
  let component: ExampleGroupLegend;
  let fixture: ComponentFixture<ExampleGroupLegend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleGroupLegend],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleGroupLegend);
    component = fixture.componentInstance;

    const layer = new RasterLayer({
      id: 'test',
      type: 'wms',
      name: 'test',
      url: 'testurl',
      legendImg: 'testurl'
    });
    const legendmap = new RasterLayer({
      id: 'test2',
      type: 'wms',
      name: 'test',
      url: 'testurl',
      legendImg: 'testurl'
    })
    const group = new LayerGroup({
      id: "test",
      name: "test",
      layers: [layer, legendmap],
    });
    fixture.componentRef.setInput("group", group);

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
